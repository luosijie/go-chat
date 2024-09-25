package serviceContacts

import (
	"fmt"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/luosijie/go-chat/server/database/sql"
	"github.com/luosijie/go-chat/server/pkg/response"
)

// @Summary ApplyContacts
// @Tags Contacts
// @Param Token        header          string   true        "Token"
// @Param userId 	   path            string   true        "UserId"
// @Success 		   200             {object} interface{}
// @Router 			   /contacts/apply [post]
func ApplyContacts(c *gin.Context) {
	fromId := c.MustGet("userId").(uint)
	toId, _ := strconv.Atoi(c.Param("userId"))

	// contacts := sql.FindContacts(userId)

	fmt.Printf("fromId = %v; toId = %v\n", fromId, toId)

	response.Success(c, "Friend request has been sent", nil)
}

// @Summary Find Contacts
// @Tags Contacts
// @Param Token        header string  true "Token"
// @Param userId 	   path   string  true "UserId"
// @Success 		   200      {object} interface{}
// @Router 			   /sign-up [post]
func FindContacts(c *gin.Context) {
	userId := c.MustGet("userId").(uint)

	contacts := sql.FindContacts(userId)

	response.Success(c, "Success", contacts)

}

// @Summary Get Contacts
// @Tags Contacts
// @Param Token        header string  true "Token"
// @Param userId 	   path   string  true "UserId"
// @Success 		   200      {object} interface{}
// @Router 			   /contacts/list [get]
func GetContacts(c *gin.Context) {
	userId := c.MustGet("userId").(uint)

	contacts := sql.FindContacts(userId)

	response.Success(c, "Success", contacts)
}

// @Summary AddContacts
// @Tags Contacts
// @Param Token        header string true "Token"
// @Param userId 	   path string   true "UserId"
// @Success 		   200      {object} interface{}
// @Router 			   /contracts/:userId [post]
func AddContacts(c *gin.Context) {
	userId := c.MustGet("userId").(uint)
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

// @Summary AddContacts
// @Tags Contacts
// @Param userId 	   path string   true "UserId"
// @Success 		   200      {object} interface{}
// @Router 			   /sign-up [post]
func DeleteContacts(c *gin.Context) {
	userId := c.MustGet("userId").(uint)

	contacts := sql.FindContacts(userId)

	response.Success(c, "Success", contacts)

}
