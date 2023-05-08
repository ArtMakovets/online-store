package postgres

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "ecommerce_demo_user"
	password = "ecommerce_demo_pass"
	dbname   = "ecommerce_demo"
)

type ClientConfig struct {
	User         string
	Password     string
	Host         string
	Port				 int
	DBName       string
	MaxIdleConns int
	MaxOpenConns int
	DisableTLS   bool
}

// NewClient()
func Open(cfg ClientConfig) (*sql.DB, error) {
	connStr := fmt.Sprintf("host=%s port=%d user=%s " +
					"password=%s dbname=%s sslmode=disable", cfg.Host, cfg.Port, cfg.User, cfg.Password, cfg.DBName)
	db, err := sql.Open("postgres", connStr)
	if err != nil {
			return nil, err
	}
	err = db.Ping()
	if err != nil {
		return nil, err
	}

	fmt.Println("Successfully connected to DB!")

	return db, nil
}