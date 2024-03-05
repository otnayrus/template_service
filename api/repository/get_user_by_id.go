package repository

import (
	"context"
	"database/sql"

	"github.com/otnayrus/template-service/api/dto"
	"github.com/otnayrus/template-service/api/pkg/errorwrapper"
)

func (r *Repository) GetUserByID(ctx context.Context, id int) (*dto.User, error) {
	var user dto.User
	err := r.Db.QueryRowContext(ctx, getUserByIDQuery, id).Scan(&user.ID, &user.Name, &user.Email, &user.Password)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, errorwrapper.WrapErr(errorwrapper.ErrResourceNotFound, "user with this id does not exist")
		}
		return nil, err
	}
	return &user, nil
}
