package serviceWS

import "time"

// Define types for message

type MessageType string

const (
	MessageNotice MessageType = "notice"
	MessageChat   MessageType = "chat"
)

type ContentType string

const (
	ContentText  ContentType = "text"
	ContentEmoji ContentType = "emoji"
	ContentImage ContentType = "image"
)

type Message struct {
	Type MessageType `json:"type"`

	From uint `json:"from"`
	To   uint `json:"to"`

	GroupType GroupType `json:"groupType"`
	GroupID   string    `json:"groupId"`

	ContentType ContentType `json:"contentType"`
	Content     string      `json:"content"`
	Date        time.Time   `json:"date"`
}
