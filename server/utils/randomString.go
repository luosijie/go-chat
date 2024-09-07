package utils

import (
	"math/rand"
)

var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

func RandomString(length int) string {
	strArray := make([]byte, length)

	for i := 0; i < length; i++ {
		strArray[i] = charset[rand.Intn(len(charset))]
	}

	return string(strArray)
}
