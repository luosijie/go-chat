package sql

import (
	"gorm.io/gorm"
)

type GroupMember struct {
	gorm.Model
	GroupID uint  `json:"group_id"`
	Group   Group `json:"group" gorm:"foreignKey:GroupID"`
	UserID  uint  `json:"user_id"`
	User    User  `json:"user" gorm:"foreignKey:UserID"`
}

func (table *GroupMember) TableName() string {
	return "groupMember"
}

func CreateGroupMember(group *GroupMember) error {
	return db.Create(group).Error
}

func FindGroupMembers(groupID uint, out interface{}) error {

	var groupMembers []*GroupMember

	if err := db.Model(&GroupMember{}).Where("group_id = ?", groupID).Find(&groupMembers).Error; err != nil {
		return err
	}

	db.Model(&groupMembers).Association("User").Find(out)

	return nil
}
