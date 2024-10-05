package serviceWS

import (
	"github.com/gin-gonic/gin"
)

func Router(router *gin.Engine) {

	// g := router.Group("/ws")

	// g.Use(middleware.Auth())

	// Routes for auth
	router.GET("/ws/connect", connectClient)
}
