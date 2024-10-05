package serviceContacts

import (
	"github.com/gin-gonic/gin"
	"github.com/luosijie/go-chat/server/middleware"
)

func Router(router *gin.Engine) {
	group := router.Group("/contacts")

	group.Use(middleware.Auth())

	// Routes for auth
	// group.POST("/apply/:userId", ApplyContacts)
	group.POST("/:userId", AddContacts)
	group.GET("/list", GetContactsList)
	group.DELETE("/:friendId", DeleteContacts)
}
