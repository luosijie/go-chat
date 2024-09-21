package router

import (
	"github.com/gin-gonic/gin"
	serviceContacts "github.com/luosijie/go-chat/server/service/contacts"
)

func routerContact(router *gin.Engine) {
	// Routes for auth
	router.GET("/contacts/:userId", serviceContacts.FindContacts)
	router.POST("/contacts/:userId", serviceContacts.AddContacts)
}
