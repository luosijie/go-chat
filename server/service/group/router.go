package serviceGroup

import (
	"github.com/gin-gonic/gin"
	"github.com/luosijie/go-chat/server/middleware"
)

func Router(router *gin.Engine) {

	g := router.Group("/group")

	g.Use(middleware.Auth())

	// Routes for auth
	// g.GET("", CreateGroup)
	g.POST("", createGroup)
	g.GET("/list", getGroupList)
	g.DELETE("/:groupId", deleteGroup)
	g.POST("/exit/:groupId", exitGroup)
}
