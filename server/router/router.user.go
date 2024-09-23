package router

import (
	"github.com/gin-gonic/gin"
	"github.com/luosijie/go-chat/server/middleware"
	serviceUser "github.com/luosijie/go-chat/server/service/user"
)

func routerUser(router *gin.Engine) {

	g := router.Group("/user")

	g.Use(middleware.Auth())

	// Routes for auth
	g.GET("/page", serviceUser.UserPage)
}
