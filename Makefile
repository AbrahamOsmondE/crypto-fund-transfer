SHELL := /bin/bash

.PHONY: kill
build:
	yarn install

prettier-write:
	yarn prettier . --write

prettier-check:
	npx prettier . --check

DOCKER_IMAGE_REPO := crypto-fund-transfer
ARCH := arm64
build.image: build Dockerfile
	rm -rf node_modules && yarn install --production
	DOCKER_BUILDKIT=1 docker build --platform linux/$(ARCH) -t $(DOCKER_IMAGE_REPO):latest .

run-docker-build-testnet: build
	make build.image
	docker run --env-file .env --env-file ./envs/.testnet.env --network=host --rm $(DOCKER_IMAGE_REPO):latest

run-docker-build-mainnet: build
	make build.image
	docker run --env-file .env --env-file ./envs/.mainnet.env --network=host --rm $(DOCKER_IMAGE_REPO):latest
kill:
	@echo "killing process in port 5000"
	@lsof -t -i:5000 | xargs -r kill -9


