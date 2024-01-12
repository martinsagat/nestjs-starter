# Start the Docker containers
up:
	@if [ ! -f .env ]; then \
		cp .env.example .env; \
	fi
	docker-compose up -d

# Stop and remove the Docker containers
down:
	docker-compose down
