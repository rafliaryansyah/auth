const Joi = require("joi");

exports.userLoginRequest = Joi.object({
    nrp: Joi.string().min(1).max(20).required().messages({
        "any.required": "nrp diperlukan",
        "string.min": "nrp harus memiliki panjang minimum {#limit}",
        "string.max": "nrp harus memiliki panjang maksimal {#limit}",
    }),
    password: Joi.string().min(5).max(64).required().messages({
        "any.required": "kata sandi diperlukan",
        "string.min": "kata sandi pengguna harus memiliki panjang minimum {#limit}",
        "string.max": "kata sandi pengguna harus memiliki panjang maksimal {#limit}",
    }),
    site: Joi.string().valid("MHU", "BIB").required().messages({
        "any.required": "kata sandi diperlukan"
    })
});
