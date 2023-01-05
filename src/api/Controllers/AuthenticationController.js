require("dotenv").config();
const { catchAsync } = require("./../Utils/CatchAsync");
const authenticationRequest = require("./../Requests/AuthenticationRequest");
const authenticationService = require("./../Services/AuthenticationService");
const tokenService = require("./../Services/TokenService");
const userService = require("./../Services/UserService");
const { Application } = require("./../Models");
const ApiError = require("../Utils/ApiError");


const login = catchAsync(async (request, response) => {
    if (!request.get("project_key")) {
        throw new ApiError(400, "Bad Request", "Header Project Key dibutuhkan!");
    }
    const application = await Application.findOne({ where: { key: request.get("project_key") } });
    if (!application) {
        throw new ApiError(400, "Bad Request", "Project Key tidak ditemukan");
    }
    const result = await authenticationRequest.userLoginRequest.validateAsync(request["body"]);
    const { nrp, password, site } = result;
    const user = await authenticationService.loginWithNrpAndPassword(nrp, password, site);
    const accessToken = await tokenService.generateAuthenticationToken(user, application);
    const refreshToken = await tokenService.generateAuthenticationRefreshToken(user, application);
    response.status(200).send({ code: 200, status: "OK", data: { token: { access: accessToken, refhresh: refreshToken }, application: {
        name: application.name
    }}});
});

const logout = catchAsync(async (request, response) => {
    response.send({ code: 200, status: "OK", message: "berhasil" });
});

const refreshToken = catchAsync(async (request, response) => {
    if (!request.get("project_key")) {
        throw new ApiError(400, "Bad Request", "Header Project Key dibutuhkan!");
    }
    const application = await Application.findOne({ where: { key: request.get("project_key") } });
    if (!application) {
        throw new ApiError(400, "Bad Request", "Project Key tidak ditemukan");
    }
    const result = await authenticationRequest.userResetTokenRequest.validateAsync(request["body"]);
    const token = await tokenService.verifyToken(result.refreshToken);
    const user = await userService.getUserById(token.sub);
    const accessToken = await tokenService.generateAuthenticationToken(user, application);
    const refreshToken = await tokenService.generateAuthenticationRefreshToken(user, application);
    response.status(200).send({ code: 200, status: "OK", data: { accessToken, refreshToken } });
});

module.exports = {
    login,
    logout,
    refreshToken
};