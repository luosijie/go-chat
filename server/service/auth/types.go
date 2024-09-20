package serviceAuth

type tSignUpReq struct {
	Email        string `form:"email"`
	Username     string `form:"username"`
	Password     string `form:"password"`
	Confirmation string `form:"confirmation"` // password confirmation
}

type tSignUpRes struct {
	Avatar   string `json:"avatar"`
	Email    string `json:"email"`
	Username string `json:"username"`
}

type tLoginReq struct {
	Username string `form:"username"`
	Password string `form:"password"`
}

type tLoginRes struct {
	ID       uint   `json:"id"`
	Token    string `json:"token"`
	Avatar   string `json:"avatar"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

type tVerifyEmailRes struct {
	Token    string `json:"token"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

type tResetPasswordReq struct {
	Email        string `json:"email"`
	Password     string `form:"password"`
	Confirmation string `form:"confirmation"` // password confirmation
}
