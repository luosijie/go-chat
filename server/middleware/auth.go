package middleware

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/luosijie/go-chat/server/pkg/response"
	"github.com/luosijie/go-chat/server/utils"
)

func Auth() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Get token from header
		tokenString := c.GetHeader("Token")

		// Parse token
		claims, err := utils.ParseToken(tokenString)

		if err != nil {
			response.RequestFail(c, response.Error{
				Code:    -300,
				Message: err.Error(),
			})
			fmt.Println("verfify token error:", tokenString, err)
			c.Abort()
			return
		}

		c.Set("userID", claims.ID)

		c.Next()
	}
}
