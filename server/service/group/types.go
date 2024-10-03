package serviceGroup

type createGroupReq struct {
	Name string `json:"name"`
	Desc string `json:"desc"`
}

type getGroupListRes []struct {
	Name string `json:"name"`
	Desc string `json:"desc"`
}
