package sql

import (
	"gorm.io/gorm"
)

type Group struct {
	gorm.Model
	Avatar  string `json:"avatar"`
	Name    string `json:"name"`
	Desc    string `json:"desc"`
	OwnerID uint   `json:"owner_id"`
	Owner   User   `json:"owner" gorm:"foreignKey:OwnerID"`
}

func (table *Group) TableName() string {
	return "group"
}

func CreateGroup(group *Group) error {
	return db.Create(group).Error

}

func FindGroupsByOwnerID(id uint, result interface{}) error {
	return db.Model(Group{Model: gorm.Model{ID: id}}).Joins("Owner").Find(result).Error
}

func FindGroup(group *Group) error {
	return db.Where(group).First(group).Error
}

func FindGroupByID(id uint) *Group {
	var group = Group{Model: gorm.Model{ID: id}}
	if err := db.First(&group).Error; err != nil {
		return nil
	}
	return &group
}

func UpdateGroup(group *Group) error {
	return db.Model(group).Updates(group).Error
}

func FindGroupByName(groupname string) *Group {
	group := &Group{}
	if err := db.Where("groupname = ?", groupname).First(group).Error; err != nil {
		return nil
	}
	return group
}
