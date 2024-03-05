package delivery

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/otnayrus/template-service/api/dto"
	"github.com/otnayrus/template-service/api/pkg/errorwrapper"
)

func (h *handler) UpdateUser(c *gin.Context) {
	var (
		req dto.UpdateUserRequest
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

	userID := c.GetInt("user_id")
	if userID != req.ID {
		c.JSON(http.StatusForbidden, gin.H{"error": "You can't update other users"})
		return
	}

	existing, err := h.repo.GetUserByID(ctx, userID)
	if err != nil {
		c.JSON(errorwrapper.ConvertToHTTPError(err))
		return
	}

	err = h.repo.UpdateUser(ctx, req.MakeModel(*existing))
	if err != nil {
		c.JSON(errorwrapper.ConvertToHTTPError(err))
		return
	}

	c.JSON(http.StatusOK, gin.H{"id": req.ID})

}
