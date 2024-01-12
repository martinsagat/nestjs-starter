# Use the official MySQL image from Docker Hub
FROM mysql:latest

# Define build-time arguments
ARG MYSQL_ROOT_PASSWORD_ARG
ARG MYSQL_DATABASE_ARG
ARG MYSQL_USER_ARG
ARG MYSQL_PASSWORD_ARG

# Set environment variables to configure MySQL
ENV MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD_ARG}
ENV MYSQL_DATABASE=${MYSQL_DATABASE_ARG}
ENV MYSQL_USER=${MYSQL_USER_ARG}
ENV MYSQL_PASSWORD=${MYSQL_PASSWORD_ARG}

# Copy custom SQL scripts to initialize the database
COPY ./docker/MySQL/init.sql /docker-entrypoint-initdb.d/