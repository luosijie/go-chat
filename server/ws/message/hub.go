package wsMessage

type Hub struct {
	Clients    map[uint]*Client
	Register   chan *Client
	Unregister chan *Client
}
