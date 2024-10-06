package serviceGroup

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/luosijie/go-chat/server/database/sql"
	"github.com/luosijie/go-chat/server/pkg/response"
	"github.com/luosijie/go-chat/server/types"
)

// @Summary CreateGroup
// @Tags    Group
// @Param   Token      	header   string  true  "Token"
// @Param   name        body     string  true  "Name"
// @Param   desc        body     string  false  "Desc"
// @Param   ownerId     body     uint    true   "OwnerId"
// @Param   memberIds   body     []uint    true   "MemberIds"
// @Success 200         { object }  interface{}
// @Router 	/group      [post]
func CreateGroup(c *gin.Context) {
	userID := c.MustGet("userID").(uint)

	reqData := createGroupReq{}
	if err := c.ShouldBindJSON(&reqData); err != nil {
		response.RequestFail(c, response.Error{
			Code:    -1,
			Message: err.Error(),
		})
		return
	}

	group := sql.Group{
		Name:    reqData.Name,
		Desc:    reqData.Desc,
		OwnerID: userID,
	}

	if err := sql.CreateGroup(&group); err != nil {
		response.ServerFail(c, response.Error{
			Code:    -1,
			Message: err.Error(),
		})
		return
	}

	reqData.MemberIDs = append(reqData.MemberIDs, userID)

	if err := sql.CreateGroupMembers(group.ID, reqData.MemberIDs); err != nil {
		fmt.Println("Create members failed:", err)
	}

	response.Success(c, "Create Group Success", group)

}

// @Summary GetGroupList
// @Tags    Group
// @Param   Token      	header   string  true  "Token"
// @Param   id        path     string  true  "ID"
// @Success 200         { object }  interface{}
// @Router 	/group/list      [post]
func GetGroupList(c *gin.Context) {
	userID := c.MustGet("userID").(uint)

	var groups []groupFields

	fmt.Println("-------------------------------------------------")

	if err := sql.FintMemberGroups(userID, &groups); err != nil {
		response.ServerFail(c, response.ErrorUnknown)
		return
	}

	var res []getGroupListItem
	for _, g := range groups {
		fmt.Println("group", g)

		var members []types.UserSummary
		sql.FindGroupMembers(g.ID, &members)

		res = append(res, getGroupListItem{
			Group:   g,
			Members: members,
		})
	}

	response.Success(c, "Get group list success", &res)

}
