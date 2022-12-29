const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");

const apiError = require("./../Utils/ApiError");
const models = require("./../Models");
const { User, Profile } = require("./../Models");
const { configApp } = require("../../config/app");

exports.getUserByNrp = async(value) => {
    const user = await User.findOne({
        where: {
            nrp: value,
        }
    });
    return user;
};

exports.getUserById = async(id) => {
    const user = await User.findOne({
        where: { id: id },
        include: {
            model: Profile,
            as: "profile"
        }
    });
    if (!user) throw new apiError(404, "Not Found", "pengguna tidak ada, pengguna tidak ditemukan");
    return user;
};

exports.getUserByJwt = async(authorization) => {
    const user = await this.verifyToken(authorization);
    return await this.getUserById(user["sub"]);
};

exports.verifyToken = async(authorization) => {
    let jwtSecretKey = configApp["accessToken"];
    const token = authorization.split(" ")[1];
    return await jwt.verify(token, jwtSecretKey);
};

const GENDER_MAP = {
    L: "male",
    P: "female"
};

exports.updatePasswordUserById = async(user, body) => {
    if (!(await User.isPasswordMatch(body["currentPassword"], user["password"]))) {
        throw new apiError(
            400,
            "ValidationError",
            "Kata sandi lama tidak sesuai dengan kata sandi sekarang"
        );
    }
    if (await User.isPasswordMatch(body["newPassword"], user["password"])) {
        throw new apiError(
            400,
            "ValidationError",
            "Kata sandi baru tidak boleh sama dengan kata sandi sekarang"
        );
    }
    return await user.update({
        password: await bcrypt.hash(body.newPassword, 10),
    });
};

exports.userVerificationStatus = async (userId) => {
    const user = await this.getUserById(userId);
    // if (user.emailVerifiedAt !== null) {
    //     throw new apiError(400, "BadRequest", "user sudah melakukan verifikasi");
    // }
    return user.update({
        emailVerifiedAt: new Date(),
        isActive: true
    });
};
