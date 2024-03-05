package delivery

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/otnayrus/template-service/api/dto"
	"github.com/otnayrus/template-service/api/pkg/errorwrapper"
	"github.com/otnayrus/template-service/api/pkg/jwt"
	"github.com/otnayrus/template-service/api/pkg/secret"
)

func (h *handler) Login(c *gin.Context) {
	var (
		req dto.LoginRequest
		err error

		ctx = c.Request.Context()
	)

	err = c.BindJSON(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = req.Validate(h.validator)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := h.repo.GetUserByEmail(ctx, req.Email)
	if err != nil {
		c.JSON(errorwrapper.ConvertToHTTPError(err))
		return
	}

	err = secret.MatchPassword(req.Password, user.Password)
	if err != nil {
		c.JSON(errorwrapper.ConvertToHTTPError(err))
		return
	}

	roles, err := h.repo.GetUserRoles(ctx, user.ID)
	if err != nil {
		c.JSON(errorwrapper.ConvertToHTTPError(err))
		return
	}

	var role string = string(dto.RoleUser)
	if roles[string(dto.RoleAdmin)] {
		role = string(dto.RoleAdmin)
	}

	token, err := jwt.GenerateJWTStringWithClaims(map[string]interface{}{
		"user_id": user.ID,
		"name":    user.Name,
		"role":    role,
	})
	if err != nil {
		c.JSON(errorwrapper.ConvertToHTTPError(err))
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": token,
	})

}
