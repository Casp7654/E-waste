# Use the latest MariaDB version as the base image
FROM mariadb:latest

# Set the working directory to /app
WORKDIR /app

# Set the root user password for MariaDB
ENV PORT=3306
ENV MYSQL_ROOT_PASSWORD Supersecretdbp4ss
ENV MYSQL_DATABASE regapp

# Expose port 3306 for the database server
EXPOSE 3306

# Copy the SQL script to initialize the database
#COPY ./init.sql /docker-entrypoint-initdb.d/

# Start the MariaDB server
CMD ["mysqld"]