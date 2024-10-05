package serviceUser

import (
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/luosijie/go-chat/server/database/sql"
	"github.com/luosijie/go-chat/server/pkg/response"
)

// @Summary UserPage
// @Tags    User
// @Param   Token      	header   string true  "Token"
// @Param   page_no     query     int      true  "PageNo"
// @Param   page_size   query     int      true  "PageSize"
// @Param   username       query     string      false "Username"
// @Success 200        {object}  interface{}
// @Router 	/user/page [get]
func userPage(c *gin.Context) {
	userPage := []tUserPageRes{}

	pageNo, _ := strconv.Atoi(c.Query("page_no"))
	pageSize, _ := strconv.Atoi(c.Query("page_size"))
	username := c.Query("username")

	page := sql.FindUserPageByName(pageNo, pageSize, username, userPage)

	response.SuccessPage(c, "Get user page success", page)

}
