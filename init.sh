#!/bin/sh

if [[ -f .env ]] && [[ -f .env.test ]]; then
  echo "Setting up dev environment..."
  echo "Creating tables..."
  yarn migrate:dev
  echo "Populating tables with initial data..."
  yarn db:seed

  echo "Setting up test environment..."
  echo "Creating tables..."
  npx dotenv -e .env.test -- prisma migrate dev
  echo "Populating tables with initial data..."
  npx dotenv -e .env.test -- prisma db seed
  else
    echo "Please setup a .env and .env.test file first"
fi
