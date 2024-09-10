package router

import (
	"github.com/gin-gonic/gin"

	"github.com/luosijie/go-chat/server/docs"
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

	routerAuth(router)

	return router
}
