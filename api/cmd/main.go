package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/otnayrus/template-service/api/delivery"
	"github.com/otnayrus/template-service/api/repository"
)

func main() {
	dbDsn := "username:password@tcp(127.0.0.1:3306)/template_service"
	repo := repository.New(dbDsn)

	handler := delivery.New(repo)

	r := gin.Default()
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowMethods = []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Authorization", "Content-Type"}
	r.Use(cors.New(config))
	r.Static("/images", "./uploads")

	r.POST("/users/login", handler.Login)
	r.POST("/users", handler.CreateUser)
	r.PATCH("/users", handler.IsAuthorizedUser(), handler.UpdateUser)
	r.DELETE("/users", handler.IsAuthorizedUser(), handler.DeleteUser)

	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello world!",
		})
	})

	r.Run(":8001")
}
