# NestJS + MySQL Starter
![Unit Test Workflow](https://github.com/martinsagat/nestjs-starter/actions/workflows/unit_test.yml/badge.svg)
![E2E Workflow](https://github.com/martinsagat/nestjs-starter/actions/workflows/e2e_test.yml/badge.svg)
![Coverage Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/martinsagat/0cec30cd26854aae33dce9e1bb07d5ab/raw/jest-coverage-comment__main.json)

## Used Technologies
- [NestJS](https://nestjs.com)
- [MySQL](https://www.mysql.com) (running in docker conainer)
- [Docker](https://www.docker.com)

## Implemented Features


## Installation

```bash
# Clone Repository
$ git clone https://github.com/martinsagat/nestjs-starter.git

# Navigate to project root
$ cd nestjs-starter

# Install npm packages
$ npm install

# Run MySQL (make sure docker is running on your local machine)
$ make up
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Seeding Database

```bash
# create database
$ npm run db:create

# drop database
$ npm run db:drop

# run seeder to populate DB with data
$ npm run seed:run

# create seeder
$ npm run seed:create
```

## Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Make Commands

```bash
# start docker container(s) (in detached mode) - MySQL
$ make up

# stop and remove docker container(s)
$ make down
```
