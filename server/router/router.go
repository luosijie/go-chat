package router

import (
	"github.com/gin-gonic/gin"

	"github.com/luosijie/go-chat/server/docs"
	serviceAuth "github.com/luosijie/go-chat/server/service/auth"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func NewRouter() *gin.Engine {
	// Init router
	router := gin.New()
	router.Use(gin.Logger())

	// Set for swagger
	docs.SwaggerInfo.BasePath = ""
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))

	// Routes for auth
	router.POST("/sign-up", serviceAuth.SinUp)
	router.POST("/login", serviceAuth.Login)
	router.POST("/logout", serviceAuth.Logout)
	router.GET("/check-auth", serviceAuth.CheckAuth)
	router.POST("/verify-email", serviceAuth.VerifyEmail)
	router.POST("/forgot-password", serviceAuth.ForgotPassword)
	router.POST("/reset-password/:token", serviceAuth.ResetPassword)

	return router
}
