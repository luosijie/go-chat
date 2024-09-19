package serviceAuth

import (
	"fmt"
	"os"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/luosijie/go-chat/server/database/redis"
	"github.com/luosijie/go-chat/server/database/sql"
	"github.com/luosijie/go-chat/server/pkg/mail"
	"github.com/luosijie/go-chat/server/pkg/response"
	"github.com/luosijie/go-chat/server/utils"
)

// @Summary Sign up
// @Tags Auth
// @Param username 	   formData string   true "Username"
// @Param password 	   formData string   true "Password"
// @Param confirmation formData string   true "Password Confirmation"
// @Param email        formData string   true "Email"
// @Success 		   200      {object} interface{}
// @Router 			   /sign-up [post]
func SinUp(c *gin.Context) {
	// Get request data
	var req tSignUpReq
	if err := c.ShouldBind(&req); err != nil {
		response.RequestFail(c, response.ErrorParamLost)
		return
	}

	// Validate
	fmt.Println("req:", req)
	if req.Username == "" || req.Email == "" || req.Password == "" || req.Confirmation == "" {
		response.RequestFail(c, response.ErrorParamLost)
		return
	}

	if req.Password != req.Confirmation {
		response.RequestFail(c, response.ErrorPasswordNotMatch)
		return
	}

	// Check if user exsisted
	if existed := sql.FindUserByEmail(req.Email); existed != nil {
		response.ServerFail(c, response.Error{
			Code:    -1,
			Message: "Email existed",
		})
		return
	}

	var avatar string = ""
	// Handle avatar file
	file, err := c.FormFile("avatar")

	if err != nil {
		fmt.Println("File not founed:", file)
	} else {
		dir, _ := os.Getwd()
		filename := file.Filename
		filePath := dir + "/.temp/images/" + filename

		if errSave := c.SaveUploadedFile(file, filePath); errSave != nil {
			fmt.Println("err-save-error:", errSave)
		} else {
			avatar = utils.GetFullFilename(filename)
		}
	}

	// Hash password
	hash, err := utils.HashPassword(req.Password)
	if err != nil {
		response.ServerFail(c, response.Error{
			Code:    -1,
			Message: err.Error(),
		})
		return
	}

	user := &sql.User{
		Avatar:   avatar,
		Username: req.Username,
		Email:    req.Email,
		Password: hash,
	}

	if err := sql.CreateUser(user); err != nil {
		response.ServerFail(c, response.Error{
			Code:    -2,
			Message: err.Error(),
		})
		return
	} else {
		response.Success(c, "Sign up success!", tSignUpRes{
			Avatar:   user.Avatar,
			Username: user.Username,
			Email:    user.Email,
		})
	}
}

// @Summary Login
// @Tags Auth
// @Param username 	   body string   true "Username"
// @Param password 	   body string   true "Password"
// @Success 		   200      {object} tLoginRes
// @Router 			   /login [post]
func Login(c *gin.Context) {
	// Get request data
	var req tLoginReq
	if err := c.ShouldBindJSON(&req); err != nil {
		response.RequestFail(c, response.ErrorParamLost)
		return
	}

	// Validate request data
	if req.Username == "" || req.Password == "" {
		response.RequestFail(c, response.ErrorParamLost)
		return
	}

	// Check exsitence
	var user *sql.User
	if user = sql.FindUserByName(req.Username); user == nil {
		response.RequestFail(c, response.ErrorUserNotExist)
		return
	}

	// Check password
	if err := utils.CheckPassword(user.Password, req.Password); err != nil {
		response.RequestFail(c, response.Error{
			Code:    -1,
			Message: err.Error(),
		})
		fmt.Println("check password err:", err)
		return
	}

	// Generate jwt token
	token, err := utils.CrateToken(user.ID, user.Username)
	if err != nil {
		response.ServerFail(c, response.Error{
			Code:    -1,
			Message: err.Error(),
		})
		fmt.Println("create token error:", err)
		return
	}

	// Store token to redis
	redis.SetJWT(user.ID, token)

	// Set LastLogin
	now := time.Now()
	user.LastLogin = &now

	// Update user table
	if err := sql.UpdateUser(user); err != nil {
		response.ServerFail(c, response.Error{
			Code:    -1,
			Message: err.Error(),
		})
		return
	}

	response.Success(c, "Login success!", tLoginRes{
		Username: user.Username,
		Avatar:   user.Avatar,
		Email:    user.Email,
		Token:    token,
	})

}

// @Summary Logout
// @Tags Auth
// @Param Token 	   header  string   true "Token"
// @Success 		   200      {object} interface{}
// @Router 			   /logout [post]
func Logout(c *gin.Context) {
	// Get token from header
	tokenString := c.GetHeader("Token")

	// Parse token
	claims, err := utils.ParseToken(tokenString)

	if err != nil {
		response.RequestFail(c, response.Error{
			Code:    -1,
			Message: err.Error(),
		})
		fmt.Println("verfify token error:", tokenString, err)
		return
	}

	// Delete token from redis
	id, err := strconv.Atoi(claims.ID)
	if err != nil {
		response.ServerFail(c, response.ErrorUnknown)
	}
	redis.DeleteJWT(uint(id))

	response.Success(c, "Logout success!", nil)
}

// @Summary Check Auth
// @Tags Auth
// @Param Token 	   header  string   true "Token"
// @Success 		   200     bool     true
// @Router 			   /check-auth [post]
func CheckAuth(c *gin.Context) {
	// Get token from header
	tokenString := c.GetHeader("Token")

	// Parse token
	_, err := utils.ParseToken(tokenString)

	if err != nil {
		response.RequestFail(c, response.Error{
			Code:    -1,
			Message: err.Error(),
		})
		fmt.Println("verfify token error:", tokenString, err)
		return
	}

	response.Success(c, "Auth valid", nil)

}

// @Summary Send verification code to email
// @Tags Auth
// @Param email 	   formData  string   true "Email"
// @Success 		   200     string     "go to check your email"
// @Router 			   /forgot-password [post]
func ForgotPassword(c *gin.Context) {
	email := c.PostForm("email")

	user := sql.FindUserByEmail(email)
	if user == nil {
		response.RequestFail(c, response.Error{
			Code:    -1,
			Message: "Email not match",
		})
		return
	}

	verificationToken := utils.RandomString(6)
	verificationTokenExpiresAt := time.Now().Add(3 * time.Minute)

	user.VerificationToken = verificationToken
	user.VerificationTokenExpiresAt = &verificationTokenExpiresAt

	if err := sql.UpdateUser(user); err != nil {
		response.ServerFail(c, response.ErrorUnknown)
		return
	}

	if err := mail.SendResetPasswordToken(verificationToken, user.Email); err != nil {
		response.ServerFail(c, response.Error{
			Code:    -1,
			Message: "Send email failed",
		})

		fmt.Println("Send email fail:", err)

		return
	}

	response.Success(c, "Go to check your email", nil)
}

// @Summary Submit verification code
// @Tags Auth
// @Param email    formData string true "Email"
// @Param code 	   formData  string   true "Code"
// @Success 		   200     {object}    tVerifyEmailRes
// @Router 			   /verify-email [post]
func VerifyEmail(c *gin.Context) {
	email := c.PostForm("email")
	code := c.PostForm("code")

	user := &sql.User{
		Email:             email,
		VerificationToken: code,
	}

	if err := sql.FindUser(user); err != nil {
		response.RequestFail(c, response.Error{
			Code:    -1,
			Message: "Verification fail",
		})
		return
	}

	now := time.Now()
	if now.Before(*user.VerificationTokenExpiresAt) {
		response.RequestFail(c, response.Error{
			Code:    -1,
			Message: "Verification fail",
		})
		return
	}

	// Clear verification setting
	user.IsVerified = true
	user.VerificationToken = ""
	user.VerificationTokenExpiresAt = nil

	// Set resetPasswordToken
	resetPasswordToken := utils.RandomString(10)
	resetPasswordTokenExpiresAt := time.Now().Add(3 * time.Minute)

	user.ResetPasswordToken = resetPasswordToken
	user.ResetPasswordTokenExpiresAt = &resetPasswordTokenExpiresAt

	if err := sql.UpdateUser(user); err != nil {
		response.ServerFail(c, response.ErrorUnknown)
		return
	}

	response.Success(c, "Verification success", tVerifyEmailRes{
		Token:    resetPasswordToken,
		Username: user.Username,
		Email:    user.Email,
	})
}

// @Summary ResetPassword
// @Tags Auth
// @Param token         path      string   true "Toke"
// @Param password 	    formData  string   true "Password"
// @Param confirmation 	formData  string   true "Confirmation"
// @Success 		    200       bool     true
// @Router 			    /reset-password [post]
func ResetPassword(c *gin.Context) {
	token := c.Param("token")
	var req tResetPasswordReq

	if err := c.ShouldBind(&req); err != nil {
		response.RequestFail(c, response.ErrorParamLost)
		return
	}

	if req.Password != req.Confirmation {
		response.RequestFail(c, response.ErrorParamLost)
		return
	}

	user := &sql.User{
		Email:              req.Email,
		ResetPasswordToken: token,
	}

	if err := sql.FindUser(user); err != nil {
		response.RequestFail(c, response.ErrorParamLost)
		return
	}

	// Compare time
	now := time.Now()
	if now.Before(*user.VerificationTokenExpiresAt) {
		response.RequestFail(c, response.Error{
			Code:    -1,
			Message: "Verification fail",
		})
		return
	}

	// Update new password
	hashedPassword, err := utils.HashPassword(req.Password)
	if err != nil {
		response.ServerFail(c, response.ErrorUnknown)
		return
	}

	user.Password = hashedPassword

	if err := sql.UpdateUser(user); err != nil {
		response.ServerFail(c, response.ErrorUnknown)
		return
	}

	response.Success(c, "Reset password success!", nil)
}
