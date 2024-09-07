package serviceAuth

type SignUpReq struct {
	Email        string `form:"email"`
	Username     string `form:"username"`
	Password     string `form:"password"`
	Confirmation string `form:"confirmation"` // password confirmation
}

type LoginReq struct {
	Username string `form:"username"`
	Password string `form:"password"`
}

type LoginRes struct {
	Token    string `json:"token"`
	Username string `json:"username"`
	Email    string `json:"email"`
}
