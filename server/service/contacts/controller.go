package serviceContacts

import (
	"fmt"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/luosijie/go-chat/server/database/sql"
	"github.com/luosijie/go-chat/server/pkg/response"
	"github.com/luosijie/go-chat/server/types"
)

// @Summary ApplyContacts
// @Tags Contacts
// @Param Token        header          string   true        "Token"
// @Param userId 	   path            string   true        "UserId"
// @Success 		   200             {object} interface{}
// @Router 			   /contacts/apply [post]
func ApplyContacts(c *gin.Context) {
	fromId := c.MustGet("userID").(uint)
	toId, _ := strconv.Atoi(c.Param("userId"))

	// contacts := sql.FindContacts(userId)

	fmt.Printf("fromId = %v; toId = %v\n", fromId, toId)

	response.Success(c, "Friend request has been sent", nil)
}

// @Summary Get Contacts List
// @Tags Contacts
// @Param Token        header string  true "Token"
// @Param userId 	   path   string  true "UserId"
// @Success 		   200      {object} interface{}
// @Router 			   /contacts/list [get]
func GetContactsList(c *gin.Context) {
	userId := c.MustGet("userID").(uint)

	var list []types.UserSummary

	if err := sql.FindContacts(userId, &list); err != nil {
		response.ServerFail(c, response.ErrorUnknown)
		return
	}

	response.Success(c, "Success get contacts", list)
}

// @Summary AddContacts
// @Tags Contacts
// @Param Token        header string true "Token"
// @Param userId 	   path string   true "UserId"
// @Success 		   200      {object} interface{}
// @Router 			   /contracts/:userId [post]
func AddContacts(c *gin.Context) {
	userId := c.MustGet("userID").(uint)
	friendId, _ := strconv.Atoi(c.Param("userId"))

	user := sql.FindUserByID(uint(friendId))
	if user == nil {
		response.ServerFail(c, response.Error{
			Code:    -1,
			Message: "User not found",
		})
		return
	}

	fmt.Println("user :", user)

	if err := sql.CreateContacts(userId, uint(friendId)); err != nil {
		response.ServerFail(c, response.Error{
			Code:    -1,
			Message: "Fail to add friend",
		})
		return
	}

	response.Success(c, "success", nil)

}

// @Summary Delete Contacts
// @Tags Contacts
// @Param Token        header            string   true        "Token"
// @Param userId 	   path              string   true        "UserId"
// @Success 		   200      {object} interface{}
// @Router 			   /contacts/:userId [delete]
func DeleteContacts(c *gin.Context) {
	userId := c.MustGet("userID").(uint)
	friendId, _ := strconv.Atoi(c.Param("friendId"))

	if err := sql.DeleteContacts(userId, uint(friendId)); err != nil {
		response.ServerFail(c, response.Error{
			Code:    -1,
			Message: err.Error(),
		})
		return
	}

	response.Success(c, "Remove contacts successful", nil)

}
