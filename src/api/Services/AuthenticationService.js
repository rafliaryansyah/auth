const bcrypt = require("bcrypt");

const models = require("./../Models");
const { User, Profile } = require("./../Models");
const userService = require("./UserService");
const tokenService = require("./TokenService");
const apiError = require("./../Utils/ApiError");

const loginWithNrpAndPassword = async (nrp, password, site) => {
    const user = await userService.getUserByNrp(nrp);
    if (!user || !(await User.isPasswordMatch(password, user["password"]))) {
        throw new apiError(400, "ValidationError", "Nrp atau password salah");
    }
    // if condition when user.verifiedAt is null blocked access
    // if (user.emailVerifiedAt == null) {
    //     throw new apiError(400, "ValidationError", "user belum terverifikasi, verifikasi terlebih dahulu");
    // }
    return user;
};

module.exports = {
    loginWithNrpAndPassword
};