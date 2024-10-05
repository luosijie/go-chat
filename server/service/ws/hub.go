package serviceWS

import (
	"encoding/json"
	"fmt"

	"github.com/luosijie/go-chat/server/database/redis"
)

type Hub struct {
	Chats     map[string]*Chat `json:"chat"`
	Clients   map[uint]*Client `json:"clients"`
	Login     chan *Client     `json:"login"`
	Logout    chan *Client     `json:"logout"`
	Broadcast chan *Message    `json:"broadcast"`
}

func NewHub() *Hub {
	return &Hub{
		Chats:     make(map[string]*Chat),
		Clients:   make(map[uint]*Client),
		Login:     make(chan *Client),
		Logout:    make(chan *Client),
		Broadcast: make(chan *Message, 10),
	}
}

func (h *Hub) Run() {
	fmt.Println("[hub is running ...]")
	for {
		fmt.Println("[hub tick ...]")
		select {

		case client := <-h.Login:
			fmt.Println("[Client login ...]")
			if _, ok := h.Clients[client.ID]; !ok {
				h.Clients[client.ID] = client
			}

		case client := <-h.Logout:
			fmt.Println("[Client logout ...]")
			if _, ok := h.Clients[client.ID]; ok {
				delete(h.Clients, client.ID)
				close(client.Messages)
			}

		case msg := <-h.Broadcast:
			fmt.Printf("[Client broadcast ...]%+v", msg)

			// For chat message
			if msg.Type == MessageChat {
				chat, ok := h.Chats[msg.ChatID]

				if !ok {

					chat = &Chat{
						ID:      msg.ChatID,
						Type:    msg.ChatType,
						Members: []uint{},
					}

					chat.SetMembers(msg.ChatID)

				}

				fmt.Println("\nmembers", chat.Members)
				fmt.Println("\nclients", h.Clients)

				for _, id := range chat.Members {

					go func(id uint) {
						if client, ok := h.Clients[id]; ok {
							client.Messages <- msg
						} else {
							value, _ := json.Marshal(msg)
							if err := redis.AddMessage(id, value); err != nil {
								fmt.Println("message-to-redis error:", err)
							}
							// store in redis when client not login

						}

					}(id)
				}
			}

			// For notice message
			if msg.Type == MessageNotice {
				if client, ok := h.Clients[msg.To.ID]; ok {
					client.Messages <- msg
				}
			}

		}
	}
}
