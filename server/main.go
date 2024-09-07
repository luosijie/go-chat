package main

import (
	"github.com/luosijie/go-chat/server/config"
	"github.com/luosijie/go-chat/server/database/redis"
	"github.com/luosijie/go-chat/server/database/sql"
	"github.com/luosijie/go-chat/server/router"
)

func init() {
	sql.Connect()
	redis.Connect()
}

func main() {

	r := router.NewRouter()

	r.Run(config.GetServerPort())
}
