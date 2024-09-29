package serviceWS

import (
	"fmt"
)

type Hub struct {
	Groups    map[string]*Group `json:"group"`
	Clients   map[uint]*Client  `json:"clients"`
	Login     chan *Client      `json:"login"`
	Logout    chan *Client      `json:"logout"`
	Broadcast chan *Message     `json:"broadcast"`
}

func NewHub() *Hub {
	return &Hub{
		Groups:    make(map[string]*Group),
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
				group, ok := h.Groups[msg.GroupID]

				if !ok {

					group = &Group{
						ID:      msg.GroupID,
						Type:    "",
						Members: []uint{},
					}

					if msg.GroupType == GroupSingle {
						group.SetCoupleMembers(msg.GroupID)
					}

				}

				fmt.Println("\nmembers", group.Members)
				fmt.Println("\nclients", h.Clients)

				for _, id := range group.Members {

					go func(id uint) {
						if client, ok := h.Clients[id]; ok {
							client.Messages <- msg
						} else {
							// store in redis when client not login
						}

					}(id)
				}
			}

			// For notice message
			if msg.Type == MessageNotice {
				if client, ok := h.Clients[msg.To]; ok {
					client.Messages <- msg
				}
			}

		}
	}
}
