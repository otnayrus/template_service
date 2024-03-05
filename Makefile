setup:
	cp .env.example .env
	npm install -g yarn
	yarn install
	go install github.com/deepmap/oapi-codegen/v2/cmd/oapi-codegen@latest

run-local-client:
	yarn dev

run-local-server:
	cd ./api/cmd && go run main.go