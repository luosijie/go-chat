package response

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func Success(c *gin.Context, data any) {
	c.JSON(http.StatusOK, data)
}

func RequestFail(c *gin.Context, e Error) {
	c.JSON(http.StatusBadRequest, e)
}

func ServerFail(c *gin.Context, e Error) {
	c.JSON(http.StatusInternalServerError, e)
}
