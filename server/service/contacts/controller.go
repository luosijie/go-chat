package serviceContacts

import (
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/luosijie/go-chat/server/database/sql"
	"github.com/luosijie/go-chat/server/pkg/response"
)

// @Summary FindContacts
// @Tags Contacts
// @Param userId 	   path string   true "UsreId"
// @Success 		   200      {object} interface{}
// @Router 			   /sign-up [post]
func FindContacts(c *gin.Context) {
	userId, err := strconv.Atoi(c.Param("userId"))

	if err != nil {
		response.RequestFail(c, response.Error{
			Code:    12,
			Message: "userId required",
		})
		return
	}

	contacts := sql.FindContacts(uint(userId))

	response.Success(c, "Success", contacts)

}

// @Summary AddContacts
// @Tags Contacts
// @Param userId 	   path string   true "UsreId"
// @Success 		   200      {object} interface{}
// @Router 			   /sign-up [post]
func AddContacts(c *gin.Context) {
	userId, err := strconv.Atoi(c.Param("userId"))

	if err != nil {
		response.RequestFail(c, response.Error{
			Code:    12,
			Message: "userId required",
		})
		return
	}

	contacts := sql.FindContacts(uint(userId))

	response.Success(c, "Success", contacts)

}

// @Summary AddContacts
// @Tags Contacts
// @Param userId 	   path string   true "UsreId"
// @Success 		   200      {object} interface{}
// @Router 			   /sign-up [post]
func DeleteContacts(c *gin.Context) {
	userId, err := strconv.Atoi(c.Param("userId"))

	if err != nil {
		response.RequestFail(c, response.Error{
			Code:    12,
			Message: "userId required",
		})
		return
	}

	contacts := sql.FindContacts(uint(userId))

	response.Success(c, "Success", contacts)

}
