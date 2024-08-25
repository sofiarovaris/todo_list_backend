# Todo List Backend

This project is a simple API for a todo list application. It is built using the NestJS framework and uses a MariaDB database to store the data.

## Project setup

```bash
$ npm install
```

## Project configuration

To run this project, you need to configure the database connection. To do this, create a `.env` file in the root of the project and copy the contents of the `.env.example` file into it. Then, replace the values with your own.

### General environment variables

`DB_HOST`: The host of the database server.  
`DB_PORT`: The port of the database server.  
`DB_USER`: The username to use to connect to the database.  
`DB_PASSWORD`: The password to use to connect to the database.  
`DB_NAME`: The name of the database to use.  
`DB_ROOT_PASSWORD`: The root password of the database server.  
`CORS_ORIGINS`: A comma-separated list of origins that are allowed to access the API.  
`AUTH_FLOW`: The authentication flow to use. Can be either `production` or `development`.

### Development environment variables

If you set `AUTH_FLOW` to `development`, it means that the API will use a simple authentication using a username and password store in the database. The following environment variables are required:

`JWT_SECRET`: The secret to use to sign the JWT tokens.

### Production environment variables

If you set `AUTH_FLOW` to `production`, it means that the API will use AWS Cognito to authenticate users. The following environment variables are required:

`COGNITO_REGION`: The region of the Cognito user pool.
`COGNITO_USER_POOL_ID`: The ID of the Cognito user pool.
`COGNITO_CLIENT_ID`: The ID of the Cognito client.

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# production mode
$ npm run prod
```

## Run tests

```bash
# unit tests
$ npm run test
```
