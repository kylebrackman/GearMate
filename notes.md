# GearMate Startup Info
Notes file on various GearMate info. 

## Table of Contents
- [Notes](#notes)
- [Common Commands](#common-commands)
- [Setting Up Postgres in Docker](#setting-up-postgres-in-docker)
- [Environment Variables](#environment-variables)
- [Common Setup Errors](#common-setup-errors)

## Notes

This README contains important information about setting up and troubleshooting the GearMate III Backend project.

## Common Commands

### Pruning Docker
- `docker system prune`: Removes unused data
- `docker-compose restart backend`: Restarts the backend service

### Checking Environment Mode
- `console.log(import.meta.env.MODE);`: Logs the current environment mode

### Entering Docker Environment
- `docker exec -it gearmate_iii-backend-1 bash`: Enters the backend container
- `docker exec -it gearmate_iii-backend-1 bin/rails db:migrate`: Runs migrations
- `exit`: Exits the container

### Entering Ruby Console
- `docker exec -it <backend-id> bin/rails c`: Opens the Ruby console

## Setting Up Postgres in Docker

1. Enter the Docker environment:
- `docker exec -it gearmate_iii-backend-1 bash`

2. Run migrations:
`bin/rails db:migrate`

3. Exit the container:
- `exit`

4. To enter the Ruby console:
- `docker exec -it <backend-id> bin/rails c`

## Environment Variables

### In the client folder add .env.development
Add the following variable:
- `VITE_API_URL=http://localhost:3000`

### Root Directory (.env)
Add the following variables:
- `POSTGRES_USER=<yourname>`
- `POSTGRES_PASSWORD=<password>`

## Common Setup Errors

### Proxy Error
Frontend logs:
- `Error: connect ECONNREFUSED 127.0.0.1:3000`
Console error:
= `UserApi.ts:5 GET http://localhost:5173/api/me net::ERR_ABORTED 500 (Internal Server Error)`

#### Possible causes and solutions:
1. Ensure the Vite proxy in `vite.config` is pointing to the correct path (localhost vs backend)
2. Add this line to development.rb if missing
- `config.hosts << "backend"`
3. If having dependency issues in the frontend:
- `docker-compose exec frontend npm install`


## Heroku Notes
git subtree push --prefix backend heroku main

### Enter Rails Console in Heroku Environment

- `heroku run rails console --app gearmate`

If you want to look at attributes of an object, you need to add .attributes at the end of your method like so 
`User.find(1).attributes`


#### Info on subdir heroku buildpack
https://elements.heroku.com/buildpacks/timanovsky/subdir-heroku-buildpack