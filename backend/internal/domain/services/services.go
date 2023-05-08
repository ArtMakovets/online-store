package services

import "github.com/artville/sandbox_projects/draft_8/internal/domain/models"

type ProductServiceInterface interface {
	GetAll() ([]*models.Product, error)
	GetByID(id int64) (*models.Product, error)
	Store(p *models.ProductInput) (*models.Product, error)
	Update(p *models.ProductInput) error
	Delete(id int64) error
}