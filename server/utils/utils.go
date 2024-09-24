package utils

import (
	"os"

	"github.com/luosijie/go-chat/server/config"
)

func GetFullFilename(filename string) string {
	return "http://" + config.GetServerHost() + config.GetServerPort() + "/images/" + filename
}

func IsDev() bool {
	return os.Getenv("ENV") == "dev"
}
