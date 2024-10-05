package redis

import (
	"strconv"
	"time"

	"github.com/luosijie/go-chat/server/config"
)

const JWT = "jwt:"

// JWT Methods
func SetJWT(id uint, value string) error {
	key := JWT + strconv.Itoa(int(id))
	duration := time.Hour * time.Duration(config.GetJWTExpire())
	return set(key, value, duration)
}

func GetJWT(id uint) (string, error) {
	key := JWT + strconv.Itoa(int(id))
	return get(key)
}

func DeleteJWT(id uint) error {
	key := JWT + strconv.Itoa(int(id))

	_, err := delete(key)

	return err
}
