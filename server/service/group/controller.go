package serviceGroup

import (
	"fmt"
	"strconv"

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
func createGroup(c *gin.Context) {
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
// @Router 	/group/list      [get]
func getGroupList(c *gin.Context) {
	userID := c.MustGet("userID").(uint)

	var groups []groupFields

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

// @Summary DeleteGroup
// @Tags    Group
// @Param   Token      	         header      string     true  "Token"
// @Param   groupId                   path        string     true  "ID"
// @Success 200         		 { object }  interface{}
// @Router 	/group/:groupId      [delete]
func deleteGroup(c *gin.Context) {
	userID := c.MustGet("userID").(uint)

	groupId, err := strconv.Atoi(c.Param("groupId"))

	if err != nil {
		response.RequestFail(c, response.ErrorParamLost)
		return
	}

	group := sql.FindGroupByID(uint(groupId))

	if userID != group.OwnerID {
		response.RequestFail(c, response.Error{
			Code:    -1,
			Message: "Only owner can delete group",
		})

		return
	}

	if err := sql.DeleteGroup(uint(groupId)); err != nil {
		response.ServerFail(c, response.Error{
			Code:    -1,
			Message: err.Error(),
		})
	}
	response.Success(c, "Group deleted", groupId)
}

// @Summary ExitGroup
// @Tags    Group
// @Param   Token      	          header      string     true  "Token"
// @Param   groupId               path        string     true  "ID"
// @Success 200         		  { object }  interface{}
// @Router 	/group/exit/:groupId  [post]
func exitGroup(c *gin.Context) {
	userID := c.MustGet("userID").(uint)

	groupId, err := strconv.Atoi(c.Param("groupId"))

	if err != nil {
		response.RequestFail(c, response.ErrorParamLost)
		return
	}
	if err := sql.DeleteGroupMembers(uint(groupId), userID); err != nil {
		response.ServerFail(c, response.Error{
			Code:    -1,
			Message: err.Error(),
		})
	}
	//
	response.Success(c, "Exit group success", groupId)
}
