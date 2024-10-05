package sql

import (
	"fmt"

	"gorm.io/gorm"
)

type Contacts struct {
	gorm.Model
	UserID   uint `gorm:"uniqueIndex:contacts" json:"user_id"`
	FriendID uint `gorm:"uniqueIndex:contacts" json:"friend_id"`
	Friend   User `gorm:"foreignKey:FriendID" json:"friend"`
}

func (table *Contacts) TableName() string {
	return "contacts"
}

func CreateContacts(userId uint, friendId uint) error {

	tx := db.Begin()

	contactsUser := Contacts{
		UserID:   userId,
		FriendID: friendId,
	}

	if err := tx.Create(&contactsUser).Error; err != nil {
		tx.Rollback()
		return err
	}

	contactsFriend := &Contacts{
		UserID:   friendId,
		FriendID: userId,
	}

	if err := tx.Create(&contactsFriend).Error; err != nil {
		tx.Rollback()
		return err
	}

	tx.Commit()

	return nil
}

func DeleteContacts(userId uint, friendId uint) error {
	fmt.Println("Delete Contacts Params:", userId, friendId)
	tx := db.Begin()

	if err := tx.Unscoped().Where("user_id = ? AND friend_id = ?", userId, friendId).Delete(&Contacts{}).Error; err != nil {
		tx.Rollback()
		return err
	}

	if err := tx.Unscoped().Where("user_id = ? AND friend_id = ?", friendId, userId).Delete(&Contacts{}).Error; err != nil {
		tx.Rollback()
		return err
	}

	tx.Commit()

	return nil
}

func FindContacts(userId uint, out interface{}) error {

	contacts := []Contacts{}

	if err := db.Model(&Contacts{}).Where("user_id = ?", userId).Find(&contacts).Error; err != nil {
		return err
	}

	db.Model(&contacts).Association("Friend").Find(out)

	return nil

}
