package sql

import (
	"gorm.io/gorm"
)

type GroupMember struct {
	gorm.Model
	GroupID uint  `json:"GroupId"`
	Group   Group `json:"Group" gorm:"foreignKey:GroupID"`
	UserID  uint  `json:"userId"`
	User    User  `json:"user" gorm:"foreignKey:UserID"`
}

func (table *GroupMember) TableName() string {
	return "groupMember"
}

func CreateGroupMember(group *GroupMember) error {
	return db.Create(group).Error
}

func FindGroupMember(group *GroupMember) error {
	return db.Where(group).First(group).Error
}

func FindGroupMemberByID(id uint) *GroupMember {
	var group = GroupMember{Model: gorm.Model{ID: id}}
	if err := db.First(&group).Error; err != nil {
		return nil
	}
	return &group
}

func UpdateGroupMember(group *GroupMember) error {
	return db.Model(group).Updates(group).Error
}

func FindGroupMemberByName(groupname string) *GroupMember {
	group := &GroupMember{}
	if err := db.Where("groupname = ?", groupname).First(group).Error; err != nil {
		return nil
	}
	return group
}
