package config

type tGmail struct {
	Port     int    `yaml:"port"`
	Account  string `yaml:"account"`
	AppName  string `yaml:"appName"`
	Password string `yaml:"password"`
	Name     string `yaml:"name"`
}

type tAccounts struct {
	Gmail tGmail
}

var accounts tAccounts

// func init() {
// 	file, err := os.ReadFile("config/accounts.yaml")
// 	if err != nil {
// 		log.Fatal("Read config error:", err)
// 		// panic(err)
// 	}

// 	if err := yaml.Unmarshal(file, &accounts); err != nil {
// 		log.Fatal("Load config error:", err)
// 	}
// }

func GetGmail() tGmail {
	return accounts.Gmail
}
