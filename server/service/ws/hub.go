package serviceWS

import "fmt"

type Hub struct {
	Groups    map[uint]*Group  `json:"group"`
	Clients   map[uint]*Client `json:"clients"`
	Login     chan *Client     `json:"login"`
	Logout    chan *Client     `json:"logout"`
	Broadcast chan *Message    `json:"broadcast"`
}

func NewHub() *Hub {
	return &Hub{
		Groups:    make(map[uint]*Group),
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
			fmt.Println("1111111111111111111111")
			if _, ok := h.Clients[client.ID]; !ok {
				h.Clients[client.ID] = client
			}

		case client := <-h.Logout:
			if _, ok := h.Clients[client.ID]; ok {
				delete(h.Clients, client.ID)
				close(client.Messages)
			}

		case msg := <-h.Broadcast:
			if msg.To != 0 {
				if client, ok := h.Clients[msg.To]; ok {
					client.Messages <- msg
				}
			}
			if msg.ToGroup != 0 {
				if g, ok := h.Groups[msg.ToGroup]; ok {
					for _, client := range g.Clients {
						client.Messages <- msg
					}
				}
			}
		}
	}
}
