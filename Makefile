# Variables
SERVER_CONTAINER = pawplanner-server-1
VALIDATION_RULES_SRC = ./validationRules/validationRules.ts
SERVER_PATH = server/src
SERVER_VALIDATION_PATH = ${SERVER_PATH}/services/readonly/validationRules.ts
SERVER_MIGRATION_PATH = ${SERVER_PATH}/migrations/
CLIENT_VALIDATION_PATH = client/src/helpers/readonly/validationRules.ts
OS := $(shell uname)

# Rules
.PHONY: default
default: launch

.PHONY: env
env:
	@if [ ! -f .env ]; then \
		echo "Copying .env.sample to .env..."; \
		cp .env.sample .env; \
	else \
		echo ".env already exists. Skipping copy."; \
	fi

.PHONY: install
install:
	@echo "Installing dependencies..."
	npm run install:all

.PHONY: init-db
init-db:
	@echo "Initializing database..."
	npm run db:init

.PHONY: sync-validation
sync-validation:
	@echo "Synchronizing validation rules..."
	cp $(VALIDATION_RULES_SRC) $(SERVER_VALIDATION_PATH)
	cp $(VALIDATION_RULES_SRC) $(CLIENT_VALIDATION_PATH)

.PHONY: check-server-container
check-server-container:
	@if ! docker ps --filter "name=$(SERVER_CONTAINER)" --filter "status=running" | grep $(SERVER_CONTAINER) > /dev/null; then \
		echo "Error: $(SERVER_CONTAINER) must be running."; \
		exit 1; \
	fi

.PHONY: seed
seed: check-server-container
	@echo "Seeding database..."
	docker exec -it $(SERVER_CONTAINER) sh -c "npm run db:seed"
	@echo "Database seeded."

.PHONY: mig-reindex
mig-reindex: check-server-container
	@read -p "Nom de la nouvelle migration (ex: ReindexSearchIndex): " name; \
	TIMESTAMP=$$(date +%s); \
	FILE=${SERVER_MIGRATION_PATH}$$TIMESTAMP-$$name.ts; \
	cp ${SERVER_MIGRATION_PATH}template/ReindexSearchIndex.ts $$FILE; \
	if [ "$(OS)" = "Darwin" ]; then \
		sed -i "" "s/PopulateSearchIndex/$$name$$TIMESTAMP/" $$FILE; \
	else \
		sed -i "s/PopulateSearchIndex/$$name$$TIMESTAMP/" $$FILE; \
	fi; \
	echo "Created : $$FILE"
	@echo $(OS)

.PHONY: seed-reindex
seed-reindex: seed mig-reindex migrations

.PHONY: build
build:
	@echo "Starting Docker Compose..."
	docker compose up --build -d

.PHONY: up
up:
	@echo "Starting Docker Compose..."
	docker compose up -d

.PHONY: migrations
migrations: check-server-container
	@echo "Running migrations..."
	docker exec -it $(SERVER_CONTAINER) sh -c "npm run typeorm migration:run -- -d ./src/dataSource/dataSource.ts"

.PHONY: migration-revert
migration-revert: check-server-container
	@echo "Reverting last migration..."
	docker exec -it $(SERVER_CONTAINER) sh -c "npm run typeorm migration:revert -- -d ./src/dataSource/dataSource.ts"

.PHONY: first-launch
first-launch: install init-db sync-validation build
	@echo "Congrats, your first launch is complete. ✨"

.PHONY: launch
launch: install sync-validation build

.PHONY: test-e2e
test-e2e:
	@echo "Running end-to-end tests with Playwright..."
	cd client && npm run test:e2e