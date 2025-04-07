# Variables
SERVER_CONTAINER = pawplanner-server-1
VALIDATION_RULES_SRC = ./validationRules/validationRules.ts
SERVER_VALIDATION_PATH = server/src/services/readonly/validationRules.ts
CLIENT_VALIDATION_PATH = client/src/helpers/readonly/validationRules.ts

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
	npm run init:db

.PHONY: sync-validation
sync-validation:
	@echo "Synchronizing validation rules..."
	cp $(VALIDATION_RULES_SRC) $(SERVER_VALIDATION_PATH)
	cp $(VALIDATION_RULES_SRC) $(CLIENT_VALIDATION_PATH)

.PHONY: build
build:
	@echo "Starting Docker Compose..."
	docker compose up --build -d

.PHONY: up
up:
	@echo "Starting Docker Compose..."
	docker compose up -d

.PHONY: migrations
migrations:
	@echo "Running migrations..."
	docker exec -it $(SERVER_CONTAINER) sh -c "npm run typeorm migration:run -- -d ./src/dataSource/dataSource.ts"

.PHONY: first-launch
first-launch: install init-db sync-validation build
	@echo "Congrats, your first launch is complete. ✨"

.PHONY: launch
launch: install sync-validation build
