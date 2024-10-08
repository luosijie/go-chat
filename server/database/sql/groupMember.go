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

func CreateGroupMember(groupId uint, userId uint) error {
	groupMember := &GroupMember{
		GroupID: groupId,
		UserID:  userId,
	}
	return db.Create(&groupMember).Error
}

func CreateGroupMembers(groupId uint, userIds []uint) error {
	tx := db.Begin()

	for _, id := range userIds {
		if err := tx.Create(&GroupMember{
			GroupID: groupId,
			UserID:  id,
		}).Error; err != nil {
			tx.Rollback()
		}
	}

	return tx.Commit().Error
}

func DeleteGroupMembers(groupId uint, userId uint) error {
	return db.Unscoped().Where("group_id = ? AND user_id = ?", groupId, userId).Delete(&GroupMember{}).Error
}

func FindGroupMembers(groupID uint, out interface{}) error {

	var groupMembers []*GroupMember

	if err := db.Model(&GroupMember{}).Where("group_id = ?", groupID).Find(&groupMembers).Error; err != nil {
		return err
	}

	return db.Model(&groupMembers).Association("User").Find(out)

}

func FintMemberGroups(memberId uint, out interface{}) error {
	var groupMembers []*GroupMember

	if err := db.Model(&GroupMember{}).Where("user_id = ?", memberId).Find(&groupMembers).Error; err != nil {
		return err
	}

	return db.Model(&groupMembers).Joins("Owner").Association("Group").Find(out)
}
