const express = require("express");
const route = express.Router();

const authenticationController = require("../Controllers/AuthenticationController");

route.post("/login", authenticationController.login);
route.post("/refresh-token", authenticationController.refreshToken);

module.exports = route;
