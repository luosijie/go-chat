package sql

import (
	"gorm.io/gorm"
)

type Chatroom struct {
	gorm.Model
	Name        string `json:"name"`
	Description string `json:"description"`
	CreatorID   uint   `json:"creator_id"`
}

func (table *Chatroom) TableName() string {
	return "chatroom"
}

func CreateChatroom(chartroom *Chatroom) error {
	return db.Create(&chartroom).Error
}

func DeleteChatroom(id uint) error {

	return db.Delete(&Chatroom{}, id).Error

}
