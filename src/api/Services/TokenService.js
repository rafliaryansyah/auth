const jwt = require("jsonwebtoken");
const moment = require("moment");

const { configApp } = require("./../../config/app");
const userService = require("./UserService");
const apiError = require("./../Utils/ApiError");
const { imageUrlMobileConditonUrl } = require("../Utils/Helper");

const generateToken = (user, expired, type, secret, dataAddon) => {
    let payload = {};
    switch (type) {
        case "RESET_PASSWORD":
            payload = {
                sub: user["id"],
                nrp: dataAddon.nrp,
                iat: moment().unix(),
                exp: expired,
                id: user["password"],
                type
            };
            break;
        case "VERIFY_EMAIL":
            payload = {
                sub: user["id"],
                nrp: dataAddon.nrp,
                exp: expired,                                        
                type
            };
            break;
        case "ACCESS":
            payload = {
                sub: user["id"],
                img: user.profile ? imageUrlMobileConditonUrl(user.profile.image) : null,
                iat: moment().unix(),
                exp: expired,
                fn: user["fullName"],
                type
            };
            break;
        case "REFRESH":
            payload = {
                sub: user["id"],
                iat: moment().unix(),
                exp: expired,
                type
            };
            break;
        default:
            // payload = {};
            break;
    }
    return jwt.sign(payload, secret);
};

exports.generateAuthenticationToken = async(user, application) => {
    const accessTokenExpire = moment().add(application.accessExpiredDuration, application.expiredUnit).unix();
    return generateToken(user, accessTokenExpire, "ACCESS", application.accessSecretToken, user);
};

exports.generateAuthenticationRefreshToken = async(user, application) => {
    const refreshTokenExpire = moment().add(application.refreshExpiredDuration, application.expiredUnit).unix();
    return generateToken(user, refreshTokenExpire, "REFRESH", application.accessSecretToken, user);
};

exports.generateTokenForNrp = async(nrp, type) => {
    const user = await userService.getUserByNrp(nrp);
    if (!user) { throw new apiError(404, "Not Found", "Pengguna tidak ditemukan dengan nrp ini"); }
    const expired = moment().add(1, "days").unix();
    return generateToken(user, expired, type, configApp["jwt"]["secret"], { nrp });
};

exports.verifyToken = async(token, application) => {
    try {
        const payload = jwt.verify(token, application);
        return payload;
    } catch (error) {
        throw new apiError(400, "Unauthorized", "token tidak valid");
    }
};

exports.emailVerify = async(token) => {
    const verified = jwt.verify(token, configApp["jwt"]["secret"]);
    if (verified["type"] !== "VERIFY_EMAIL") {
        throw new apiError(400, "Unauthorized", "Jenis token tidak valid");
    }
    return await userService.userVerificationStatus(verified["sub"]);
};