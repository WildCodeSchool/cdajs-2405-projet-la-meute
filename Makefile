# Variables
SERVER_CONTAINER = pawplanner-server-1
VALIDATION_RULES_SRC = ./validationRules/validationRules.ts
SERVER_VALIDATION_PATH = server/src/services/readonly/validationRules.ts
CLIENT_VALIDATION_PATH = client/src/helpers/readonly/validationRules.ts

.PHONY: env
env:
	@echo "Copying .env.sample to .env..."
	cp .env.sample .env

# Cible pour installer les dépendances
.PHONY: install
install:
	@echo "Installing dependencies..."
	npm run install:all

# Cible pour initialiser la base de données
.PHONY: init-db
init-db:
	@echo "Initializing database..."
	npm run init:db

# Cible pour synchroniser les règles de validation
.PHONY: sync-validation
sync-validation:
	@echo "Synchronizing validation rules..."
	cp $(VALIDATION_RULES_SRC) $(SERVER_VALIDATION_PATH)
	cp $(VALIDATION_RULES_SRC) $(CLIENT_VALIDATION_PATH)

# Cible pour démarrer Docker Compose
.PHONY: build
build:
	@echo "Starting Docker Compose..."
	docker compose up --build -d

.PHONY: up
up:
	@echo "Starting Docker Compose..."
	docker compose up -d

# Cible pour lancer les migrations
.PHONY: migrations
migrations:
	@echo "Running migrations..."
	docker exec -it $(SERVER_CONTAINER) sh -c "npm run typeorm migration:run -- -d ./src/dataSource/dataSource.ts"

# Cible pour le premier lancement en appelant toutes les étapes
.PHONY: first-launch
first-launch: install init-db sync-validation build
	@echo "Congrats, your first launch is complete. ✨"

.PHONY: launch
launch: install sync-validation build

# default make command
default: launch
