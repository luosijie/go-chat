package serviceWS

// Define types for message

type MessageType string

const (
	MessageFriend MessageType = "friend"
	MessageGroup  MessageType = "group"
)

type ContentType string

const (
	ContentText  ContentType = "text"
	ContentEmoji ContentType = "emoji"
	ContentImage ContentType = "image"
)

type Message struct {
	From        uint        `json:"from"`
	To          uint        `json:"to"`
	ToGroup     uint        `json:"to_group"`
	Type        MessageType `json:"type"`
	ContentType ContentType `json:"content_type"`
	Content     string      `json:"content"`
}

// Define type for goup

type Group struct {
	ID      uint            `json:"id"`
	Clients map[uint]Client `json:"clients"`
}
