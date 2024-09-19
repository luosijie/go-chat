package response

type Result struct {
	Success bool   `json:"success"`
	Code    int    `json:"code"`
	Message string `json:"message"`
	Data    any    `json:"data"`
}

type Error struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

func NewOK(message string, data any) Result {
	return Result{
		Success: true,
		Code:    100,
		Message: message,
		Data:    data,
	}
}

func NewError(err Error) Result {
	return Result{
		Success: false,
		Code:    err.Code,
		Message: err.Message,
		Data:    nil,
	}
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
