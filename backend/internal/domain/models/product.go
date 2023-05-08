package models

import (
	"errors"
	"time"
)

var (
	ErrRecordNotFound = errors.New("record not found")
	ErrEditConflict   = errors.New("edit conflict")
)

type ProductStorer interface {
	GetAll() ([]*Product, error)
	GetByID(id int64) (*Product, error)
	Insert(p *Product) error
	Update(p *Product) error
	Delete(id int64) error
}

type Product struct {
	ID int64						`json:"id"`
	Title string				`json:"title"`
	Description string	`json:"description"`
	Price float32				`json:"price"`
	Image string				`json:"image"`
	Href string					`json:"href"`
	Available bool			`json:"available"` // InStock  bool

	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}

type ProductInput struct {
	Title string
	Description string
	Price float32
	Image string
}

func NewProduct(title string, description string, price float32, image string) *Product {
	return &Product{
		Title: title,
		Description: description,
		Price: price,
		Image: image,
		Available: true,
	}
}