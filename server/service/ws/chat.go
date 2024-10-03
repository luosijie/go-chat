package serviceWS

import (
	"slices"
	"strconv"
	"strings"
)

// Define type for goup

type ChatType string

const (
	SingleChat ChatType = "single" // store in client
	GroupChat  ChatType = "group"  // store in mySQL
)

type Chat struct {
	ID      string   `json:"id"`
	Type    ChatType `json:"type"`
	Members []uint   `json:"members"`
}

func (g *Chat) HasMember(id uint) bool {
	return slices.Contains(g.Members, id)
}

// id looks like "20-19"
// means user:20 is now chating with user:19
func (g *Chat) SetCoupleMembers(id string) {
	var members []uint
	strs := strings.Split(id, "-")
	for _, s := range strs {
		in, _ := strconv.Atoi(s)
		members = append(members, uint(in))
	}
	g.Members = members
}
