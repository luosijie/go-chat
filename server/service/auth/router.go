package serviceAuth

import (
	"github.com/gin-gonic/gin"
)

func Router(router *gin.Engine) {
	// Routes for auth
	router.GET("/check-auth", CheckAuth)
	router.POST("/sign-up", SinUp)
	router.POST("/login", Login)
	router.POST("/logout", Logout)
	router.POST("/verify-email", VerifyEmail)
	router.POST("/forgot-password", ForgotPassword)
	router.POST("/reset-password/:token", ResetPassword)
}
