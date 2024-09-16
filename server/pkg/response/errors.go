package response

type Error struct {
	ErrCode int    `json:"err_code"`
	Message string `json:"message"`
}

var ErrorUnknown Error = Error{
	ErrCode: -4,
	Message: "Unknown error",
}

var ErrorParamLost Error = Error{
	ErrCode: -1,
	Message: "Params lost",
}

var ErrorPasswordNotMatch Error = Error{
	ErrCode: -2,
	Message: "Password not match",
}

var ErrorUserNotExist Error = Error{
	ErrCode: -3,
	Message: "User not exist",
}
