package serviceContacts

import (
	"github.com/gin-gonic/gin"
	"github.com/luosijie/go-chat/server/database/sql"
	"github.com/luosijie/go-chat/server/pkg/response"
)

// @Summary FindContacts
// @Tags Contacts
// @Param Token        header string  true "Token"
// @Param userId 	   path   string  true "UsreId"
// @Success 		   200      {object} interface{}
// @Router 			   /sign-up [post]
func FindContacts(c *gin.Context) {
	userId := c.MustGet("userId").(uint)

	contacts := sql.FindContacts(userId)

	response.Success(c, "Success", contacts)

}

// @Summary AddContacts
// @Tags Contacts
// @Param Token        header string true "Token"
// @Param userId 	   path string   true "UsreId"
// @Success 		   200      {object} interface{}
// @Router 			   /sign-up [post]
func AddContacts(c *gin.Context) {
	userId := c.MustGet("userId").(uint)

	contacts := sql.FindContacts(uint(userId))

	response.Success(c, "Success", contacts)

}

// @Summary AddContacts
// @Tags Contacts
// @Param userId 	   path string   true "UsreId"
// @Success 		   200      {object} interface{}
// @Router 			   /sign-up [post]
func DeleteContacts(c *gin.Context) {
	userId := c.MustGet("userId").(uint)

	contacts := sql.FindContacts(userId)

	response.Success(c, "Success", contacts)

}
