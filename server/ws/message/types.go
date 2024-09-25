package wsMessage

type MessageType int

const (
	AddFriend MessageType = iota
)

type Message struct {
	Type    MessageType `json:"type"`
	From    uint        `json:"from"`
	To      uint        `json:"to"`
	Content string      `json:"content"`
}
