package http

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/artville/sandbox_projects/draft_8/internal/domain/models"
	"github.com/artville/sandbox_projects/draft_8/internal/domain/services"
)

type HandlersConfig struct {
	Log string // change to real interface later
	Auth string // change to real interface later
}

type Handlers struct {
	productService services.ProductServiceInterface
}

func NewHandlers(productService services.ProductServiceInterface) *Handlers {
	return &Handlers{
		productService: productService,
	}
}


func (h *Handlers) HandleListProducts(w http.ResponseWriter, r *http.Request) {
	products, err := h.productService.GetAll()
	if err != nil {
		serverErrorResponse(w, r, err)
		return
	}

	err = JSON(w, http.StatusOK, envelope{"products": products})
	if err != nil {
		serverErrorResponse(w, r, err)
	}
}

func (h *Handlers) HandleCreateProduct(w http.ResponseWriter, r *http.Request) {
	var productInput models.ProductInput
	if err := readJSON(w, r, &productInput); err != nil {
		errorResponse(w, r, http.StatusInternalServerError, fmt.Sprintf("unable to decode payload: %s", err.Error()))
		return
	}

	prod, err := h.productService.Store(&productInput)
	if err != nil {
		errorResponse(w, r, http.StatusInternalServerError, fmt.Sprintf("creating new product, np[%+v]: %s", productInput, err.Error()))
		return
	}

	headers := make(http.Header)
	headers.Set("Location", fmt.Sprintf("/products/%d", prod.ID))

	err = JSONWithHeaders(w, http.StatusCreated, prod, headers)
	if err != nil {
		serverErrorResponse(w, r, err)
	}
}

func (h *Handlers) HandleGetProduct(w http.ResponseWriter, r *http.Request) {
	id, err := readIDParam(r)
	if err != nil {
		notFoundResponse(w, r)
		return
	}

	product, err := h.productService.GetByID(id)
	if err != nil {
		switch {
		case errors.Is(err, models.ErrRecordNotFound):
			notFoundResponse(w, r)
		default:
			serverErrorResponse(w, r, err)
		}
		return
	}

	JSON(w, http.StatusOK, product)
}

func (h *Handlers) HandleUpdateProduct(w http.ResponseWriter, r *http.Request) {
	id, err := readIDParam(r)
	if err != nil {
		notFoundResponse(w, r)
		return
	}

	product, err := h.productService.GetByID(id)
	if err != nil {
		switch {
		case errors.Is(err, models.ErrRecordNotFound):
			notFoundResponse(w, r)
		default:
			serverErrorResponse(w, r, err)
		}
		return
	}

	var productInput models.ProductInput
	if err := readJSON(w, r, &productInput); err != nil {
		errorResponse(w, r, http.StatusInternalServerError, fmt.Sprintf("unable to decode payload: %s", err.Error()))
		return
	}

	err = h.productService.Update(&productInput)
	if err != nil {
		switch {
		case errors.Is(err, models.ErrEditConflict):
			editConflictResponse(w, r)
		default:
			serverErrorResponse(w, r, err)
		}
		return
	}

	err = JSON(w, http.StatusCreated, product)
	if err != nil {
		serverErrorResponse(w, r, err)
	}	
}

func (h *Handlers) HandleDeleteProduct(w http.ResponseWriter, r *http.Request) {
	id, err := readIDParam(r)
	if err != nil {
		notFoundResponse(w, r)
		return
	}	

	err = h.productService.Delete(id)
	if err != nil {
		serverErrorResponse(w, r, err)
		return
	}

	err = JSON(w, http.StatusOK, envelope{"message": "product successfully deleted"})
	if err != nil {
		serverErrorResponse(w, r, err)
	}
}