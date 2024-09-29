package serviceWS

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
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

func ConnectClient(c *gin.Context) {
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

	welcomeMsg := Message{
		From:        userId,
		To:          userId,
		Type:        MessageNotice,
		ContentType: ContentText,
		Content:     "Logined",
		Date:        time.Now(),
	}

	h.Broadcast <- &welcomeMsg

	go client.WriteMessage()
	client.ReadMessage(h)

}
