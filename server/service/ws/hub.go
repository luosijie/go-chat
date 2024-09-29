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

			// For couple message
			if msg.Type == MessageCouple {
				if msg.To != 0 {
					if client, ok := h.Clients[msg.To]; ok {
						client.Messages <- msg
					}
				}

				if msg.From != 0 && msg.From != msg.To {
					if client, ok := h.Clients[msg.From]; ok {
						client.Messages <- msg
					}
				}
			}

			// For group message
			if msg.Type == MessageGroup {
				if msg.ToGroup != 0 {
					if g, ok := h.Groups[msg.ToGroup]; ok {
						for _, client := range g.Clients {
							client.Messages <- msg
						}
					}
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
