swag:
	@swag init

build:
	@go build -o .bin/server

run: swag build
	@.bin/server

test:
	@go test -v ./...