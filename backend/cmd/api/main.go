package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/ardanlabs/conf/v3"
	httpTransport "github.com/artville/sandbox_projects/draft_8/cmd/api/transport/http"
	"github.com/artville/sandbox_projects/draft_8/internal/domain/services"
	"github.com/artville/sandbox_projects/draft_8/internal/storage/postgres"
	"github.com/julienschmidt/httprouter"
)

var build = "develop"

func main() {

	// =========================================================================
	// Configuration

	cfg := struct {
		conf.Version
		Web struct {
			ListenAddr			int						`conf:"default:3000"`
			ReadTimeout     time.Duration `conf:"default:5s"`
			WriteTimeout    time.Duration `conf:"default:10s"`
			IdleTimeout     time.Duration `conf:"default:120s"`
			ShutdownTimeout time.Duration `conf:"default:20s"`
			APIHost         string        `conf:"default:0.0.0.0:3000"`
			DebugHost       string        `conf:"default:0.0.0.0:4000"`
		}
		DB struct {
			Dsn					 string `conf:"default:postgresql://ecommerce_demo_user:ecommerce_demo_pass@db:5432/ecommerce_demo"`
			User         string `conf:"default:ecommerce_demo_user"`
			Password     string `conf:"default:ecommerce_demo_pass,mask"`
			Host         string `conf:"default:localhost"`
			Port				 int		`conf:"default:5432"`
			Name         string `conf:"default:ecommerce_demo"`
			MaxIdleConns int    `conf:"default:25"`
			MaxOpenConns int    `conf:"default:25"`
			DisableTLS   bool   `conf:"default:true"`
		}
	}{
		Version: conf.Version{
			Build: build,
			Desc:  "copyright information here",
		},
	}

	const prefix = "CATALOG"
	_, err := conf.Parse(prefix, &cfg)
	if err != nil {
		log.Fatal(fmt.Errorf("parsing config: %w", err))
	}

	// =========================================================================
	// Start API Service

	fmt.Printf("Starting API at http://localhost:%d\n", cfg.Web.ListenAddr)

	// =========================================================================
	// Open DB connection

	db, err := postgres.Open(postgres.ClientConfig{
		Host: cfg.DB.Host,
		Port: cfg.DB.Port,
		User: cfg.DB.User,
		Password: cfg.DB.Password,
		DBName: cfg.DB.Name,
	})
	if err != nil {
		log.Fatal(fmt.Errorf("could not connect to db: %w", err))
	}
	defer db.Close()

	productRepo := postgres.NewProductRepository(db)
	productService := services.NewProductService(productRepo)
	handlers := httpTransport.NewHandlers(productService)

	mux := httprouter.New()

	mux.HandlerFunc(http.MethodGet, "/products", handlers.HandleListProducts)
	mux.HandlerFunc(http.MethodPost, "/products", handlers.HandleCreateProduct)
	mux.HandlerFunc(http.MethodGet, "/products/:id", handlers.HandleGetProduct)

	http.ListenAndServe(fmt.Sprintf(":%d", cfg.Web.ListenAddr), mux)
}