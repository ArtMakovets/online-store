package services

import (
	"fmt"

	"github.com/artville/sandbox_projects/draft_8/internal/domain/models"
	"github.com/artville/sandbox_projects/draft_8/internal/domain/services/infrastructure"
)

type ProductService struct {
	store models.ProductStorer
	emailService infrastructure.EmailSender
}

func NewProductService(store models.ProductStorer) *ProductService {
	return &ProductService{
		store: store,
	}
}

func (s *ProductService) GetAll() ([]*models.Product, error) {
	return s.store.GetAll()
}
func (s *ProductService) GetByID(id int64) (*models.Product, error) {
	return s.store.GetByID(id)
}
func (s *ProductService) Store(p *models.ProductInput) (*models.Product, error) {
	// Apply security concerns (validate user rights)

	product := models.NewProduct(p.Title, p.Description, p.Price, p.Image)

	// Validate new product
	// TODO: implement validation

	if err := s.store.Insert(product); err != nil {
		return nil, fmt.Errorf("could not create product: %w", err)
	}

	// Sent an email to our customers to notify them about it

	return product, nil
}
func (s *ProductService) Update(input *models.ProductInput) error {
	product := models.NewProduct(input.Title, input.Description, input.Price, input.Image)

	if err := s.store.Update(product); err != nil {
		return fmt.Errorf("could not update product: %w", err)
	}

	return nil
}
func (s *ProductService) Delete(id int64) error {
	return s.store.Delete(id)
}