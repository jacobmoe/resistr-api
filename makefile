.PHONY: start test
NODE_ENV ?= development

default:
	make start

start:
	source ./env/${NODE_ENV}.sh && \
		DEBUG=koa* node --harmony-async-await server.js

test:
	NODE_ENV=test ./node_modules/mocha/bin/mocha
