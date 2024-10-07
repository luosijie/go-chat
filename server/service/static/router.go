package serviceStatic

import (
	"github.com/gin-gonic/gin"
	"github.com/luosijie/go-chat/server/middleware"
)

func Router(router *gin.Engine) {
	// Static server
	router.Static("/images", ".temp/images")

	g := router.Group("/static")

	g.Use(middleware.Auth())

	// Routes for auth
	g.GET("/upload", upload)
}
