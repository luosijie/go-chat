package config

import (
	"fmt"
	"log"
	"os"

	"github.com/go-redis/redis/v8"
	"gopkg.in/yaml.v3"
)

type tConfig struct {
	Server struct {
		Host string `yaml:"host"`
		Port string `yaml:"port"`
	}
	Mysql struct {
		Username  string `yaml:"username"`
		Password  string `yaml:"password"`
		Host      string `yaml:"host"`
		Port      string `yaml:"port"`
		Dbname    string `yaml:"dbname"`
		Charset   string `yaml:"charset"`
		ParseTime string `yaml:"parseTime"`
		Loc       string `yaml:"loc"`
	}
	Redis struct {
		Host     string `yaml:"host"`
		Port     string `yaml:"port"`
		Password string `yaml:"password"`
		DB       int    `yaml:"db"`
	}
	Jwt struct {
		Secret string `yaml:"secret"`
		Expire int    `yaml:"expire"`
	}
}

var config tConfig

func init() {
	file, err := os.ReadFile("config/app.yaml")
	if err != nil {
		log.Fatal("Read config error:", err)

		panic(err)
	}

	if err := yaml.Unmarshal(file, &config); err != nil {
		log.Fatal("Load config error:", err)
	}
}

func GetServerHost() string {
	return config.Server.Host
}

func GetServerPort() string {
	return ":" + config.Server.Port
}

func GetMysqlDNS() string {
	mysql := config.Mysql

	return fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/%s?charset=%s&parseTime=%s&loc=%s",
		mysql.Username,
		mysql.Password,
		mysql.Host,
		mysql.Port,
		mysql.Dbname,
		mysql.Charset,
		mysql.ParseTime,
		mysql.Loc,
	)
}

func GetRedisOptions() *redis.Options {
	options := config.Redis
	return &redis.Options{
		Addr:     options.Host + ":" + options.Port,
		Password: options.Password,
		DB:       options.DB,
	}
}

func GetJWTSecret() string {
	return config.Jwt.Secret
}

func GetJWTExpire() int {
	return config.Jwt.Expire
}
