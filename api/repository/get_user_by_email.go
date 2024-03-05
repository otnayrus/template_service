package repository

import (
	"context"
	"database/sql"

	"github.com/otnayrus/template-service/api/dto"
	"github.com/otnayrus/template-service/api/pkg/errorwrapper"
)

func (r *Repository) GetUserByEmail(ctx context.Context, email string) (*dto.User, error) {
	var user dto.User
	err := r.Db.QueryRowContext(ctx, getUserByEmailQuery, email).Scan(&user.ID, &user.Name, &user.Email, &user.Password)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, errorwrapper.WrapErr(errorwrapper.ErrResourceNotFound, "user with this email does not exist")
		}
		return nil, err
	}
	return &user, nil
}
