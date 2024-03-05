package repository

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

type Repository struct {
	Db *sql.DB
}

func New(dsn string) *Repository {
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		panic(err)
	}
	return &Repository{
		Db: db,
	}
}
