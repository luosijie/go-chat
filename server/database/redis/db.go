package redis

import (
	"context"
	"fmt"
	"strconv"
	"time"

	"github.com/go-redis/redis/v8"
	"github.com/luosijie/go-chat/server/config"
)

var client *redis.Client

func Connect() {
	options := config.GetRedisOptions()

	fmt.Println("redis options: ", options)

	client = redis.NewClient(options)

	pong, err := client.Ping(context.Background()).Result()

	if err != nil {
		panic(err)
	}

	fmt.Println("Connected to redis successfully", pong)
}

func set(key string, value string, duration time.Duration) error {
	return client.Set(context.Background(), key, value, duration).Err()
}

func get(key string) (string, error) {
	return client.Get(context.Background(), key).Result()
}

func delete(key string) (int64, error) {
	return client.Del(context.Background(), key).Result()
}

// JWT Methods
func SetJWT(id uint, value string) error {
	key := "jwt:" + strconv.Itoa(int(id))
	duration := time.Hour * time.Duration(config.GetJWTExpire())
	return set(key, value, duration)
}

func GetJWT(id uint) (string, error) {
	key := "jwt:" + strconv.Itoa(int(id))
	return get(key)
}

func DeleteJWT(id uint) error {
	key := "jwt:" + strconv.Itoa(int(id))

	_, err := delete(key)

	return err
}
