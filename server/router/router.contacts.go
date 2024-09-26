package router

import (
	"github.com/gin-gonic/gin"
	"github.com/luosijie/go-chat/server/middleware"
	serviceContacts "github.com/luosijie/go-chat/server/service/contacts"
)

func routerContact(router *gin.Engine) {
	group := router.Group("/contacts")

	group.Use(middleware.Auth())

	// Routes for auth
	// group.POST("/apply/:userId", serviceContacts.ApplyContacts)
	group.POST("/:userId", serviceContacts.AddContacts)
	group.GET("/list", serviceContacts.GetContactsList)
	group.DELETE("/:friendId", serviceContacts.DeleteContacts)
}
