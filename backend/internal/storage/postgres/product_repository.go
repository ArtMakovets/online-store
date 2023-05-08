package postgres

import (
	"database/sql"
	"errors"
	"fmt"

	"github.com/artville/sandbox_projects/draft_8/internal/domain/models"
)

// ========================
// Notes
// Postgres Column types mapping
// JSONB type -> encoding/json.RawMessage
// BYTEA type -> []byte
// INT type -> int32
// BIGSERIAL type -> int64
// TIMESTAMP type -> time.Time

type ProductRepository struct {
	tableName string
	db *sql.DB
}

// Make sure interface is implemented
var _ models.ProductStorer = (*ProductRepository)(nil)

func NewProductRepository(db *sql.DB) *ProductRepository {
	return &ProductRepository{
		tableName: "catalog.products",
		db: db,
	}
}

func (repo *ProductRepository) GetAll() ([]*models.Product, error) {
	query := `
				SELECT id, title, description, price, image
				FROM catalog.products
				LIMIT $1 OFFSET $2`

	limit := 100
	offset := 0
	rows, err := repo.db.Query(query, limit, offset)
	if err != nil {
		return nil, fmt.Errorf("failed to retrieve product list: %w", err)	
	}
	defer rows.Close()

	var items []*models.Product
	for rows.Next() {
		var item models.Product
		if err := rows.Scan(
			&item.ID,
			&item.Title,
			&item.Description,
			&item.Price,
			&item.Image,
		); err != nil {
			return nil, err
		}

		// item.Href = "#"

		items = append(items, &item)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return items, nil
}

func (repo *ProductRepository) GetByID(id int64) (*models.Product, error) {
	if id < 1 {
		return nil, models.ErrRecordNotFound
	}

	query := `
        SELECT id, title, description, price
        FROM catalog.products
        WHERE id = $1`

	var product models.Product

	err := repo.db.QueryRow(query, id).Scan(
		&product.ID,
		&product.Title,
		&product.Description,
		&product.Price,
	)

	if err != nil {
		switch {
		case errors.Is(err, sql.ErrNoRows):
			return nil, models.ErrRecordNotFound
		default:
			return nil, fmt.Errorf("selecting product productID[%q]: %w", id, err)
		}
	}

	return &product, nil
}

func (repo *ProductRepository) Insert(p *models.Product) error {
	const query = `
	INSERT INTO catalog.products
		(title, description, price, image)
	VALUES 
		($1, $2, $3, $4)
	RETURNING id, created_at, updated_at`

	args := []any{p.Title, p.Description, p.Price, p.Image}

	return repo.db.QueryRow(query, args...).Scan(&p.ID, &p.CreatedAt, &p.UpdatedAt)
}

func (repo *ProductRepository) Update(p *models.Product) error {
	query := `
        UPDATE catalog.products 
        SET title = $1, description = $2, price = $3
        WHERE id = $5`

	args := []any{
		p.Title,
		p.Description,
		p.Price,
		p.ID,
	}

	_, err := repo.db.Exec(query, args...)
	if err != nil {
		switch {
		case errors.Is(err, sql.ErrNoRows):
			return models.ErrEditConflict
		default:
			return err
		}
	}

	return nil
}

func (repo *ProductRepository) Delete(id int64) error {
	result, err := repo.db.Exec(
		"DELETE from catalog.products WHERE id = $1",
		id,
	)
	if err != nil {
			return fmt.Errorf("failed to delete product: %w", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return models.ErrRecordNotFound
	}

	return nil
}