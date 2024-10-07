package serviceStatic

import (
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/luosijie/go-chat/server/pkg/response"
	"github.com/luosijie/go-chat/server/utils"
)

// @Summary Upload
// @Tags Static
// @Param file 	   formData file   true "File"
// @Success 		   200      {object} interface{}
// @Router 			   /upload [post]
func upload(c *gin.Context) {

	// Handle avatar file
	// var fullName string = ""

	file, err := c.FormFile("file")

	if err != nil {
		response.RequestFail(c, response.Error{
			Code:    -1,
			Message: "File not found",
		})
		return
	}

	dir, _ := os.Getwd()
	filename := file.Filename
	filePath := dir + "/.temp/images/" + filename

	if errSave := c.SaveUploadedFile(file, filePath); errSave != nil {
		fmt.Println("err-save-error:", errSave)
		response.ServerFail(c, response.Error{
			Code:    -2,
			Message: "err-save-error:",
		})
		return
	}

	result := utils.GetFullFilename(filename)
	response.Success(c, "File upload success", result)

}
