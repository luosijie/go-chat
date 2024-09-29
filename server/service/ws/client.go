package serviceWS

import (
	"encoding/json"
	"fmt"

	"github.com/gorilla/websocket"
)

type Client struct {
	ID       uint `json:"id"`
	Conn     *websocket.Conn
	Messages chan *Message
}

func (client *Client) ReadMessage(h *Hub) {
	defer func() {
		h.Logout <- client
		client.Conn.Close()
	}()

	for {
		_, msgJson, err := client.Conn.ReadMessage()

		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				fmt.Printf("[ws: unexpected close error] \n %+v", err)
			}
			break
		}

		msg := &Message{}

		json.Unmarshal(msgJson, msg)

		h.Broadcast <- msg
	}

}

func (client *Client) WriteMessage() {
	defer client.Conn.Close()

	for {
		msg, ok := <-client.Messages

		if !ok {
			fmt.Println("[ws] write message errer")
			return
		}

		client.Conn.WriteJSON(msg)
	}
}
