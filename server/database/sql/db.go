package sql

import (
	"fmt"

	"github.com/luosijie/go-chat/server/config"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var db *gorm.DB

func Connect() {
	dns := config.GetMysqlDNS()
	_db, err := gorm.Open(mysql.Open(dns), &gorm.Config{})

	if err != nil {
		panic(err)
	}

	db = _db

	fmt.Println("Connected to mysql successfully!")

	if err := db.AutoMigrate(&User{}, &Contacts{}, &Group{}, &GroupMember{}); err != nil {
		fmt.Println("Mysql migrate error:", err)
	}

}
