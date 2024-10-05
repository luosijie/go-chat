package serviceWS

import (
	"fmt"
	"slices"
	"strconv"
	"strings"

	"github.com/luosijie/go-chat/server/database/sql"
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

// SingleChat id looks like "20-19"
// means user:20 is now chating with user:19
func (chat *Chat) SetMembers(id string) {
	var members []uint

	if chat.Type == SingleChat {

		strs := strings.Split(id, "-")
		for _, s := range strs {
			in, _ := strconv.Atoi(s)
			members = append(members, uint(in))
		}
	}

	if chat.Type == GroupChat {
		id, _ := strconv.Atoi(chat.ID)
		groupID := uint(id)

		fmt.Println("group-id", groupID)

		var memberIDs []struct {
			ID uint
		}
		sql.FindGroupMembers(groupID, &memberIDs)

		if len(memberIDs) > 0 {
			for _, s := range memberIDs {
				members = append(members, s.ID)
			}
		}

	}

	chat.Members = members

}
