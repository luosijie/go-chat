package serviceGroup

import "github.com/luosijie/go-chat/server/types"

type createGroupReq struct {
	Name      string `json:"name"`
	Desc      string `json:"desc"`
	MemberIDs []uint `json:"memberIds"`
}

type groupFields struct {
	ID      uint              `json:"id"`
	Name    string            `json:"name"`
	Desc    string            `json:"desc"`
	OwnerID uint              `json:"owner_id"`
	Owner   types.UserSummary `json:"owner"`
}

type getGroupListItem struct {
	Group   groupFields         `json:"group"`
	Members []types.UserSummary `json:"members"`
}
