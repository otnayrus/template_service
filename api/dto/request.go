package dto

import (
	"github.com/go-playground/validator/v10"
	"github.com/otnayrus/template-service/api/pkg/errorwrapper"
	"github.com/otnayrus/template-service/api/pkg/secret"
)

type CreateUserRequest struct {
	Name     string `json:"name" validate:"required"`
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8"`
}

func (r *CreateUserRequest) MakeModel() (*User, error) {
	hash, err := secret.GeneratePassword(r.Password)
	if err != nil {
		return nil, errorwrapper.WrapErr(errorwrapper.ErrInternalServer, err.Error())
	}
	return &User{
		Name:     r.Name,
		Email:    r.Email,
		Password: hash,
	}, nil
}

func (r *CreateUserRequest) Validate(v *validator.Validate) error {
	return v.Struct(r)
}

type UpdateUserRequest struct {
	ID       int     `json:"id" validate:"required"`
	Name     *string `json:"name"`
	Email    *string `json:"email"`
	Password *string `json:"password"`
}

func (r *UpdateUserRequest) MakeModel(existing User) *User {
	if r.Name != nil {
		existing.Name = *r.Name
	}
	if r.Email != nil {
		existing.Email = *r.Email
	}
	if r.Password != nil {
		existing.Password = *r.Password
	}
	return &existing
}

func (r *UpdateUserRequest) Validate(v *validator.Validate) error {
	return v.Struct(r)
}

type LoginRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8"`
}

func (r *LoginRequest) Validate(v *validator.Validate) error {
	return v.Struct(r)
}

type DeleteUserRequest struct {
	ID int `json:"id" validate:"required"`
}
