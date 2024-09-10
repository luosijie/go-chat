package router

import (
	"github.com/gin-gonic/gin"
	serviceAuth "github.com/luosijie/go-chat/server/service/auth"
)

func routerAuth(router *gin.Engine) {
	// Routes for auth
	router.GET("/check-auth", serviceAuth.CheckAuth)
	router.POST("/sign-up", serviceAuth.SinUp)
	router.POST("/login", serviceAuth.Login)
	router.POST("/logout", serviceAuth.Logout)
	router.POST("/verify-email", serviceAuth.VerifyEmail)
	router.POST("/forgot-password", serviceAuth.ForgotPassword)
	router.POST("/reset-password/:token", serviceAuth.ResetPassword)
}
