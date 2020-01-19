.PHONY: all, build, release, deploy

all: build release deploy

bootstrap:
	yarn install
	yarn lerna bootstrap

build:
	cd client && yarn build
	./jank.sh
# release can be of major, minor, patch, premajor, preminor,
# prepatch, and prerelease
release ?= patch
release:
	yarn lerna version $(release) --yes

deploy:
	cd server && gcloud app deploy app.yml \
		--project cruz-hacks-2019-265520 --verbosity=info \
		--quiet
