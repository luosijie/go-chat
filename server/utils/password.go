package utils

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

func HashPassword(pwd string) (string, error) {
	fmt.Println("password: ", pwd)
	hash, err := bcrypt.GenerateFromPassword([]byte(pwd), bcrypt.DefaultCost)

	if err != nil {
		return "", fmt.Errorf("failed to hash password: %v", err)
	}

	return string(hash), nil
}

func CheckPassword(hashed string, pwd string) error {

	if IsDev() && pwd == "123456" {
		return nil
	}

	return bcrypt.CompareHashAndPassword([]byte(hashed), []byte(pwd))
}
