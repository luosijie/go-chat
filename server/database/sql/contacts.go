package sql

import "gorm.io/gorm"

type Contacts struct {
	gorm.Model
	UserId   uint `gorm:"uniqueIndex:contracts" json:"user_id"`
	FriendId uint `gorm:"uniqueIndex:contracts" json:"friend_id"`
}

func (table *Contacts) TableName() string {
	return "contacts"
}

func CreateContacts(userId uint, friendId uint) error {

	tx := db.Begin()

	contactsUser := Contacts{
		UserId:   userId,
		FriendId: friendId,
	}

	if err := tx.Create(&contactsUser).Error; err != nil {
		tx.Rollback()
		return err
	}

	contactsFriend := &Contacts{
		UserId:   friendId,
		FriendId: userId,
	}

	if err := tx.Create(&contactsFriend).Error; err != nil {
		tx.Rollback()
		return err
	}

	tx.Commit()

	return nil
}

func DeleteContacts(userId uint, friendId uint) error {
	tx := db.Begin()

	if err := tx.Where("user_id = ? AND friend_id = ?", userId, friendId).Delete(&Contacts{}).Error; err != nil {
		tx.Rollback()
		return err
	}

	if err := tx.Where("user_id = ? AND friend_id = ?", friendId, userId).Delete(&Contacts{}).Error; err != nil {
		tx.Rollback()
		return err
	}

	return nil
}

func FindContacts(userId uint) []*Contacts {

	var contacts []*Contacts

	db.Where("user_id = ?", userId).Find(&contacts)

	return contacts
}
