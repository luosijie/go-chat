package serviceStatic

import (
	"github.com/gin-gonic/gin"
	"github.com/luosijie/go-chat/server/middleware"
)

func Router(router *gin.Engine) {

	g := router.Group("/static")

	g.Use(middleware.Auth())

	// Routes for auth
	g.GET("/upload", upload)
}
