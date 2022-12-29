'use strict';
const jwt = require('jsonwebtoken');
const { configApp } = require('./../../config/app');

const ROLE_MAP = {
    1: 'super_admin',
    2: 'mentor',
    3: 'user',
};

const asAdmin = (request, response, next) => {
    let keyHeaderAuthorization = configApp['headerKey'];
    let jwtSecretKey = configApp['accessToken'];

    // check role at jwt payload
    const token = request.get(keyHeaderAuthorization).split(" ")[1];
    const verified = jwt.verify(token, jwtSecretKey);
    if (ROLE_MAP[verified['rl']] !== ROLE_MAP[1]) {
        response.send({
            code: 401,
            status: 'Unauthorized',
            message: 'Anda tidak memiliki hak akses'
        });
    };
    next();
};

module.exports = { asAdmin };