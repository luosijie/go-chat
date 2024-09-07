package mail

import (
	"bytes"
	"crypto/tls"
	"fmt"
	"html/template"
	"log"
	"path/filepath"

	"github.com/luosijie/go-chat/server/config"
	"gopkg.in/gomail.v2"
)

const PARENT_PATH = "pkg/mail"

type tValues struct {
	Code string
}

func SendResetPasswordToken(code string, to string) error {

	gmail := config.GetGmail()

	fmt.Printf("gmail:%v\n", gmail)

	m := gomail.NewMessage()

	m.SetHeader("From", gmail.Account)
	m.SetHeader("To", to)

	m.SetHeader("Subject", "Your Verify Code")

	path := filepath.Join(PARENT_PATH, "reset-password-token.html")

	t, err := template.ParseFiles(path)
	if err != nil {
		log.Println(err)
	}

	var body bytes.Buffer

	values := tValues{
		Code: code,
	}
	if err = t.Execute(&body, values); err != nil {
		log.Println(err)
	}

	m.SetBody("text/html", body.String())

	d := gomail.NewDialer("smtp.gmail.com", gmail.Port, gmail.Account, gmail.Password)
	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	return d.DialAndSend(m)

}
