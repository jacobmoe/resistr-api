.PHONY: start test
NODE_ENV ?= development

default:
	make start

start:
	source ./env/${NODE_ENV}.sh && \
		DEBUG=koa* node server.js

test:
	NODE_ENV=test ./node_modules/mocha/bin/mocha

db.create:
	node ./db/create.js

db.drop:
	node ./db/drop.js

db.schema.load:
	psql -d resistr_${NODE_ENV} -f db/schema.sql

db.schema.dump:
	pg_dump -s resistr_development > db/schema.sql

db.migration:
	./node_modules/knex/bin/cli.js migrate:make ${name}

db.migrate:
	./node_modules/knex/bin/cli.js migrate:latest
	make db.schema.dump

db.rollback:
	./node_modules/knex/bin/cli.js migrate:rollback
	make db.schema.dump

db.seed.new:
	./node_modules/knex/bin/cli.js seed:make ${name}

db.seed:
	./node_modules/knex/bin/cli.js seed:run
