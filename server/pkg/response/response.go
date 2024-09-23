package response

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func Success(c *gin.Context, message string, data any) {
	c.JSON(http.StatusOK, NewOK(message, data))
}

func SuccessPage(c *gin.Context, message string, data Page) {
	c.JSON(http.StatusOK, NewOK(message, data))
}

func RequestFail(c *gin.Context, e Error) {
	c.JSON(http.StatusBadRequest, NewError(e))
}

func ServerFail(c *gin.Context, e Error) {
	c.JSON(http.StatusInternalServerError, NewError(e))
}
