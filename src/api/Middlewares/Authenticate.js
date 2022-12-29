'use strict';
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

require('dotenv').config();

const { configApp } = require('./../../config/app');
const { tokenTypes } = require('./../../config/token');

const auth = async (request, response, next) => {
    let keyHeaderAuthorization = configApp['headerKey'];
    let jwtSecretKey = configApp['accessToken'];

    if (!request.get(keyHeaderAuthorization)) {
        return response.status(401).send({
            code: 401,
            status: 'Unauthorized',
            message: 'authorization tidak ditemukan'
        });
    }

    try {
        const token = request.get(keyHeaderAuthorization).split(" ")[1];
        const verified = jwt.verify(token, jwtSecretKey);
        if (verified['type'] !== tokenTypes['ACCESS']) {
            return response.status(401).send({
                code: 401,
                status: "Unauthorized",
                message: 'tipe token tidak sah'
            });
        };
        if (!Object.keys(verified).length) {
            return response.status(401).send({
                code: 401,
                status: "Unauthorized",
                message: 'token tidak valid'
            });
        };
        next();
    } catch (error) {
        return response.status(401).send({
            code: 401,
            status: "Unauthorized",
            message: 'token tidak valid'
        });
        next(error);
    }
};

const createUserLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 6,
    handler: function(request, response, next, options) {
        response.status(429).send({ code: 429, status: 'Too Many Requests', message: 'Terlalu banyak permintaan' });
    }
});

const resetPasswordLimit = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 8,
    handler: function(request, response, next, options) {
        response.status(429).send({ code: 429, status: 'Too Many Requests', message: 'Terlalu banyak permintaan' });
    }
});

const checkoutTransactionLimit = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 8,
    handler: function(request, response, next, options) {
        response.status(429).send({ code: 429, status: 'Too Many Requests', message: 'Terlalu banyak permintaan' });
    }
});

module.exports = { auth, createUserLimiter, resetPasswordLimit, checkoutTransactionLimit };