package serviceWS

import "time"

// Define types for message

type MessageType string

const (
	MessageNotice MessageType = "notice"
	MessageCouple MessageType = "couple"
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
	ToGroup     uint        `json:"toGroup"`
	Type        MessageType `json:"type"`
	ContentType ContentType `json:"contentType"`
	Content     string      `json:"content"`
	Date        time.Time   `json:"date"`
}

// Define type for goup

type GroupType string

const (
	GroupCouple   GroupType = "single"
	GroupMultiple GroupType = "multiple"
)

type Group struct {
	ID      uint            `json:"id"`
	Type    GroupType       `json:"type"`
	Clients map[uint]Client `json:"clients"`
}
