require('dotenv').config();

const {  
    DB_CONNECTION,
    DB_HOST,
    DB_PORT,
    DB_DATABASE,
    DB_USERNAME,
    DB_PASSWORD
} = process.env;

module.exports = {
    "development": {
        "host": DB_HOST,
        "port" : DB_PORT,
        "database": DB_DATABASE,
        "username": DB_USERNAME,
        "password": DB_PASSWORD,
        "dialect": DB_CONNECTION
    },
    "test": {
        "host": DB_HOST,
        "port" : DB_PORT,
        "database": DB_DATABASE,
        "username": DB_USERNAME,
        "password": DB_PASSWORD,
        "dialect": DB_CONNECTION
    },
    "production": {
        "host": DB_HOST,
        "port" : DB_PORT,
        "database": DB_DATABASE,
        "username": DB_USERNAME,
        "password": DB_PASSWORD,
        "dialect": DB_CONNECTION
    }
};