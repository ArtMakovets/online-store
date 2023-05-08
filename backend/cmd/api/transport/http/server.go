package http

import "net/http"

type Config struct {

}

type HttpServer struct {
	router *http.ServeMux
	config *Config
	handlers *Handlers
}

func InitServer() {
	// init dependencies
	// define routes
	// setup server
}