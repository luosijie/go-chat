package serviceWS

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/luosijie/go-chat/server/database/sql"
	"github.com/luosijie/go-chat/server/types"
	"github.com/luosijie/go-chat/server/utils"
)

var h *Hub

func InitHub() {
	h = NewHub()
	go h.Run()
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func connectClient(c *gin.Context) {
	// Get token from header
	tokenString := c.Query("Token")

	// Parse token
	claims, err := utils.ParseToken(tokenString)
	if err != nil {
		return
	}

	userId := claims.ID

	w := c.Writer
	r := c.Request

	user := sql.FindUserByID(userId)

	if user == nil {
		return
	}

	conn, err := upgrader.Upgrade(w, r, nil)

	if err != nil {
		fmt.Println("Websocket connect fail:", err)
		return
	}

	client := Client{
		ID:       userId,
		Conn:     conn,
		Messages: make(chan *Message),
	}

	h.Login <- &client

	from := types.UserSummary{
		ID:       0,
		Username: "System",
	}

	to := types.UserSummary{
		ID:       user.ID,
		Avatar:   user.Avatar,
		Username: user.Username,
		Email:    user.Email,
	}

	welcomeMsg := Message{
		From:        from, // send from system
		To:          to,
		Type:        MessageNotice,
		ContentType: ContentText,
		Content:     "Logined",
		Date:        time.Now(),
	}

	h.Broadcast <- &welcomeMsg

	go client.WriteMessage()
	client.ReadMessage(h)

}
