package serviceWS

import (
	"slices"
	"strconv"
	"strings"
)

// Define type for goup

type GroupType string

const (
	GroupSingle   GroupType = "single"   // store in client
	GroupMultiple GroupType = "multiple" // store in mySQL
)

type Group struct {
	ID      string    `json:"id"`
	Type    GroupType `json:"type"`
	Members []uint    `json:"members"`
}

func (g *Group) HasMember(id uint) bool {
	return slices.Contains(g.Members, id)
}

// id looks like "20-19"
// means user:20 is now chating with user:19
func (g *Group) SetCoupleMembers(id string) {
	var members []uint
	strs := strings.Split(id, "-")
	for _, s := range strs {
		in, _ := strconv.Atoi(s)
		members = append(members, uint(in))
	}
	g.Members = members
}
