package main

import (
	"fmt"
	"os"

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

	fmt.Println("ENV:", os.Getenv("ENV"))

	r := router.NewRouter()

	r.Run(config.GetServerPort())

}
