package config

import (
	"fmt"
	"os"

	"github.com/RianIhsan/backend-go-todo/database"
	"github.com/RianIhsan/backend-go-todo/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	db_name = ""
	db_user = "root"
	db_pass = ""
	db_host = "localhost"
	db_port = "3306"
)

func BootDatabase() {
	//CHECK DEFAULT DATABASE NAME
	if dbNameEnv := os.Getenv("DB_NAME"); dbNameEnv != "" {
		db_name = dbNameEnv
	}

	//CHECK DEFAULT DATABASE USER
	if dbUserEnv := os.Getenv("DB_USER"); dbUserEnv != "" {
		db_user = dbUserEnv
	}

	//CHECK DEFAULT DATABASE PASSWORD
	if dbPassEnv := os.Getenv("DB_PASS"); dbPassEnv != "" {
		db_pass = dbPassEnv
	}

	//CHECK DEFAULT DATABASE HOST
	if dbHostEnv := os.Getenv("DB_HOST"); dbHostEnv != "" {
		db_host = dbHostEnv
	}

	//CHECK DEFAULT DATABASE PORT
	if dbPortEnv := os.Getenv("DB_PORT"); dbPortEnv != "" {
		db_port = dbPortEnv
	}

}

func ConnectDB() {
	var err error
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", db_user, db_pass, db_host, db_port, db_name)
	database.DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("Database tidak terkoneksi")
	} else {
		fmt.Println("Database terkoneksi")
	}
}
func GoMigration() {
	if err := database.DB.AutoMigrate(models.Todo{}); err != nil {
		fmt.Println("Migration Database Gagal!")
	} else {
		fmt.Println("Database berhasil di migrasi")
	}
}
