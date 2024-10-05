package redis

import (
	"context"
	"fmt"
	"time"

	"github.com/go-redis/redis/v8"
	"github.com/luosijie/go-chat/server/config"
)

var client *redis.Client

var ctx = context.Background()

func Connect() {
	options := config.GetRedisOptions()

	fmt.Println("redis options: ", options)

	client = redis.NewClient(options)

	pong, err := client.Ping(ctx).Result()

	if err != nil {
		panic(err)
	}

	fmt.Println("Connected to redis successfully", pong)
}

func set(key string, value string, duration time.Duration) error {
	return client.Set(ctx, key, value, duration).Err()
}

func get(key string) (string, error) {
	return client.Get(ctx, key).Result()
}

func delete(key string) (int64, error) {
	return client.Del(ctx, key).Result()
}
