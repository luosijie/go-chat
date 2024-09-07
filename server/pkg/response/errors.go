package response

type Error struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

var ErrorUnknown Error = Error{
	Code:    -4,
	Message: "Unknown error",
}

var ErrorParamLost Error = Error{
	Code:    -1,
	Message: "Params lost",
}

var ErrorPasswordNotMatch Error = Error{
	Code:    -2,
	Message: "Password not match",
}

var ErrorUserNotExist Error = Error{
	Code:    -3,
	Message: "User not exist",
}
