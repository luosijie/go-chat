package router

import (
	"github.com/gin-gonic/gin"
	"github.com/luosijie/go-chat/server/middleware"
	serviceContacts "github.com/luosijie/go-chat/server/service/contacts"
)

func routerContact(router *gin.Engine) {
	g := router.Group("/contacts")

	g.Use(middleware.Auth())

	// Routes for auth
	router.GET("/contacts/:userId", serviceContacts.FindContacts)
	router.POST("/contacts/:userId", serviceContacts.AddContacts)
}
