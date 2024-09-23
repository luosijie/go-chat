package sql

import (
	"fmt"
	"time"

	"github.com/luosijie/go-chat/server/pkg/response"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Avatar                      string     `json:"avatar"`
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

func FindUser(user *User) error {
	return db.Where(user).First(user).Error
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

func FindUserPageByName(pageNo int, pageSize int, username string, rows any) response.Page {

	total := int64(0)

	limit := pageSize
	offset := pageSize * (pageNo - 1)

	query := "%" + username + "%"
	db.Model(&User{}).Limit(limit).Offset(offset).Where("username LIKE ?", query).Find(&rows)
	db.Model(&User{}).Where("username LIKE ?", query).Count(&total)

	fmt.Println("Total:", total)

	return response.Page{
		PageNo:   pageNo,
		PageSize: pageSize,
		Total:    total,
		Rows:     rows,
	}
}
