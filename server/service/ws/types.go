package serviceWS

import (
	"time"

	"github.com/luosijie/go-chat/server/types"
)

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

	From types.UserSummary `json:"from"`
	To   types.UserSummary `json:"to"`

	ChatType ChatType `json:"chatType"`
	ChatID   string   `json:"chatId"`

	ContentType ContentType `json:"contentType"`
	Content     string      `json:"content"`
	Date        time.Time   `json:"date"`
}
