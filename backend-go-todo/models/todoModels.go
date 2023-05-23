package models

import (
	"time"

	"gorm.io/gorm"
)

type Todo struct {
	ID        uint           `json:"id" gorm:"primarykey"`
	Name      string         `json:"name" gorm:"varchar(225);not null"`
	Note      *string        `json:"note" gorm:""`
	Complete  bool           `json:"complete" gorm:"default:false;not null"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"-"`
}
