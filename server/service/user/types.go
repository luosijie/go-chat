package serviceUser

type tUserPageRes struct {
	ID       uint   `json:"id"`
	Avatar   string `json:"avatar"`
	Username string `json:"username"`
	Email    string `json:"email"`
}
