install:
	npm install -g yarn
	yarn install
	go mod vendor

run-local-client:
	yarn dev

run-local-server:
	cd ./api/cmd && go run main.go

migrate:
	mysql -u root -p < .dev/migrations/001-database.sql
