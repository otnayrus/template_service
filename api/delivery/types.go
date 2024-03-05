package delivery

import (
	"context"

	"github.com/go-playground/validator/v10"
	"github.com/otnayrus/template-service/api/dto"
)

type handler struct {
	validator *validator.Validate
	repo      repo
}

func New(repo repo) *handler {
	return &handler{
		validator: validator.New(),
		repo:      repo,
	}
}

type repo interface {
	userRepository
}

type userRepository interface {
	CreateUser(ctx context.Context, user *dto.User) (int, error)
	GetUserByEmail(ctx context.Context, email string) (*dto.User, error)
	GetUserByID(ctx context.Context, id int) (*dto.User, error)
	UpdateUser(ctx context.Context, user *dto.User) error
	DeleteUser(ctx context.Context, id int) error
	IsUserHaveRole(ctx context.Context, userID int, role string) (bool, error)
	GetUserRoles(ctx context.Context, userID int) (map[string]bool, error)
}
