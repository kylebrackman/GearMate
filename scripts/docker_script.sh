#!/bin/bash

# Function to build and start Docker containers
docker_build_and_up() {
  echo "Building and starting Docker containers..."
  docker compose build
  docker compose up
}

# Function to migrate the database
migrate_db() {
  CONTAINER_NAME=$1
  if [ -z "$CONTAINER_NAME" ]; then
    echo "Please provide the container name."
    exit 1
  fi
  echo "Migrating the database in container $CONTAINER_NAME..."
  docker exec -it $CONTAINER_NAME bin/rails db:migrate
}

# Function to check if a database exists
db_exists() {
  CONTAINER_NAME=$1
  DB_NAME=$2
  docker exec -it $CONTAINER_NAME psql -U postgres -lqt | cut -d \| -f 1 | grep -qw $DB_NAME
}

# Function to create a new database if it doesn't exist
create_db() {
  CONTAINER_NAME=$1
  DB_NAME=$2
  if [ -z "$CONTAINER_NAME" ] || [ -z "$DB_NAME" ]; then
    echo "Please provide the container name and database name."
    exit 1
  fi

  if db_exists $CONTAINER_NAME $DB_NAME; then
    echo "Database $DB_NAME already exists. Skipping creation."
  else
    echo "Creating database $DB_NAME in container $CONTAINER_NAME..."
    docker exec -it $CONTAINER_NAME bin/rails db:create RAILS_ENV=development DATABASE=$DB_NAME
  fi
}

# Main script logic
case $1 in
  build)
    docker_build_and_up
    ;;
  migrate)
    migrate_db $2
    ;;
  create-db)
    create_db $2 $3
    ;;
  *)
    echo "Usage: $0 {build|migrate <container_name>|create-db <container_name> <db_name>}"
    exit 1
    ;;
esac