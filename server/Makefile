swag:
	@swag init

build:
	@go build -o .bin/server

run: swag build
	@ENV=dev .bin/server 

test:
	@go test -v ./...