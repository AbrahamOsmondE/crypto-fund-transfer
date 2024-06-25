SHELL := /bin/bash

.PHONY: kill
build:
	yarn install

prettier-write:
	yarn prettier . --write

prettier-check:
	npx prettier . --check

DOCKER_IMAGE_REPO := crypto-fund-transfer
ARCH := arm64/v8
build.image: build Dockerfile
	rm -rf node_modules && yarn install --production
	docker build --platform linux/$(ARCH) -t $(DOCKER_IMAGE_REPO):latest .

run-docker-build: build
	make build.image
	docker run --env-file .env --network=host --rm $(DOCKER_IMAGE_REPO):latest

kill:
	@echo "killing process in port 5000"
	@lsof -t -i:5000 | xargs -r kill -9


