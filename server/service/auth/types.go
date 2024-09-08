package serviceAuth

type tSignUpReq struct {
	Email        string `form:"email"`
	Username     string `form:"username"`
	Password     string `form:"password"`
	Confirmation string `form:"confirmation"` // password confirmation
}

type tLoginReq struct {
	Username string `form:"username"`
	Password string `form:"password"`
}

type tLoginRes struct {
	Token    string `json:"token"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

type tVerifyEmailRes struct {
	Token    string `json:"token"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

type tResetPasswordReq struct {
	Token        string `json:"token"`
	Email        string `json:"email"`
	Password     string `form:"password"`
	Confirmation string `form:"confirmation"` // password confirmation
}
