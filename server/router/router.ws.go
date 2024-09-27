package router

import (
	"github.com/gin-gonic/gin"
	serviceWS "github.com/luosijie/go-chat/server/service/ws"
)

func routerWS(router *gin.Engine) {

	// g := router.Group("/ws")

	// g.Use(middleware.Auth())

	// Routes for auth
	router.GET("/ws/connect", serviceWS.ConnectClient)
}
