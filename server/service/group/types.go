package serviceGroup

type createGroupReq struct {
	Name      string `json:"name"`
	Desc      string `json:"desc"`
	MemberIDs string `json:"memberIds"`
}

type getGroupListRes []struct {
	ID      uint          `json:"id"`
	Name    string        `json:"name"`
	Desc    string        `json:"desc"`
	OwnerID uint          `json:"owerId"`
	Members []interface{} `json:"members"`
}
