CREATE USER 'localdev'@'%' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON *.* TO 'localdev'@'%' WITH GRANT OPTION;
CREATE DATABASE homestep;
USE homestep;
