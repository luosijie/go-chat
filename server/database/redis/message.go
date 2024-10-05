package redis

import (
	"strconv"
)

const MESSAGE = "message:"

// JWT Methods
func AddMessage(userId uint, value []byte) error {
	key := MESSAGE + strconv.Itoa(int(userId))

	return client.LPush(ctx, key, value).Err()
}

func GetMessages(userId uint) []string {
	key := MESSAGE + strconv.Itoa(int(userId))

	length, _ := client.LLen(ctx, key).Result()
	list, _ := client.LRange(ctx, key, 1, length).Result()

	for i := 0; i < int(length); i++ {
		client.LPop(ctx, key)
	}

	return list
}

// func GetJWT(id uint) (string, error) {
// 	key := JWT + strconv.Itoa(int(id))
// 	return get(key)
// }

// func DeleteJWT(id uint) error {
// 	key := JWT + strconv.Itoa(int(id))

// 	_, err := delete(key)

// 	return err
// }
