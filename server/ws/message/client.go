package wsMessage

type Client struct {
	ID       uint   `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Messages chan *Message
}
