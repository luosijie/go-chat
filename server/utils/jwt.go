package utils

import (
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/luosijie/go-chat/server/config"
)

type tJWTClaims struct {
	jwt.RegisteredClaims
	ID       uint   `json:"user_id"`
	Username string `json:"username"`
}

var secret = []byte(config.GetJWTSecret())

func CrateToken(id uint, username string) (string, error) {

	secretKey := []byte(config.GetJWTSecret())
	duration := time.Duration(config.GetJWTExpire()) * time.Hour

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, tJWTClaims{
		ID:       id,
		Username: username,
		RegisteredClaims: jwt.RegisteredClaims{
			Issuer:    strconv.Itoa(int(id)),
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(duration)),
		},
	})

	tokenString, err := claims.SignedString(secretKey)
	if err != nil {
		return "", err
	}

	return tokenString, err

}

func ParseToken(tokenString string) (*tJWTClaims, error) {

	token, err := jwt.ParseWithClaims(tokenString, &tJWTClaims{}, func(token *jwt.Token) (interface{}, error) {
		return secret, nil
	})

	if token != nil {
		if claims, ok := token.Claims.(*tJWTClaims); ok && token.Valid {
			return claims, nil
		}
	}

	return nil, err

}
