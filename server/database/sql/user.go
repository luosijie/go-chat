package sql

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model

	Email                       string     `json:"email"`
	Username                    string     `json:"username"`
	Password                    string     `json:"password"`
	LastLogin                   *time.Time `json:"last_login"`
	IsVerified                  bool       `json:"is_verified"`
	ResetPasswordToken          string     `json:"reset_password_token"`
	ResetPasswordTokenExpiresAt *time.Time `json:"reset_password_token_expires_at"`
	VerificationToken           string     `json:"verification_token"`
	VerificationTokenExpiresAt  *time.Time `json:"verification_token_expires_at"`
}

func (table *User) TableName() string {
	return "user"
}

func CreateUser(user *User) error {
	return db.Create(user).Error
}

func UpdateUser(user *User) error {
	return db.Model(user).Updates(user).Error
}

func FindUserByName(username string) *User {
	user := &User{}
	if err := db.Where("username = ?", username).First(user).Error; err != nil {
		return nil
	}
	return user
}

func FindUserByEmail(email string) *User {
	user := &User{}
	if err := db.Where("email = ?", email).First(user).Error; err != nil {
		return nil
	}
	return user
}
