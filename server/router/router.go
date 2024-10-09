package router

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"github.com/luosijie/go-chat/server/docs"
	serviceAuth "github.com/luosijie/go-chat/server/service/auth"
	serviceContacts "github.com/luosijie/go-chat/server/service/contacts"
	serviceGroup "github.com/luosijie/go-chat/server/service/group"
	serviceUser "github.com/luosijie/go-chat/server/service/user"
	serviceWS "github.com/luosijie/go-chat/server/service/ws"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func NewRouter() *gin.Engine {
	// Init router
	router := gin.New()

	// Logger
	router.Use(gin.Logger())

	// Cors
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowMethods = []string{"POST", "GET", "DELETE", "PUT", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization", "Accept", "User-Agent", "Cache-Control", "Pragma", "Token"}
	config.ExposeHeaders = []string{"Content-Length"}
	config.AllowCredentials = true
	config.MaxAge = 12 * time.Hour

	router.Use(cors.New(config))

	// Set for swagger
	docs.SwaggerInfo.BasePath = ""
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))

	// Static server
	router.Static("/images", ".temp/images")

	serviceAuth.Router(router)
	serviceUser.Router(router)
	serviceContacts.Router(router)
	serviceWS.Router(router)
	serviceGroup.Router(router)

	return router
}
