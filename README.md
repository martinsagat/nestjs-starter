# NestJS + MySQL Starter

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
