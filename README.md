![preview](https://github.com/luosijie/go-chat/blob/main/preview/dashboard.png)

# A Fullstack Chat Web Application
> Developed with Golang and Reactjs

## Prepare

You need run MySQL and Redis successfully on you maching
```yml
server:
  host: 127.0.0.1
  port: 3000
mysql:
  username: root
  password: 12345678
  host: 127.0.0.1
  port: 3306
  dbname: go-chat
  charset: utf8mb4
  parseTime: True
  loc: Local 
redis:
  host: 127.0.0.1
  port: 6379
  db: 0
  password:
jwt:
  secret: jwt-secret
  expire: 24
```

## Run Server

> Server will run on port: 3000
```sh
cd serve

make run
```

## Run Client

> Client will run on port:5173

```sh
cd client

yarn install

yarn dev
```
