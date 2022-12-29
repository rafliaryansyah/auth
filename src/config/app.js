require("dotenv").config();

/**
 * Config 
 */
const configApp = {
    "env": process.env.APP_ENV || "development",
    "accessToken": process.env.JWT_SECRET ? process.env.JWT_SECRET : null,
    "headerKey": process.env.HEADER_KEY || "Authorization",
    "url": process.env.APP_URL || "http://localhost:3003",
    "mobileUrl": process.env.APP_URL || "http://localhost:3000",
    "adminUrl": process.env.APP_ADMIN_URL || "http://localhost:3003",
    "merchantUrl": process.env.APP_MERCHANT_URL || "http://localhost:3003",
    "jwt": {
        secret: process.env.JWT_SECRET ? process.env.JWT_SECRET : null,
        accessTokenExpire: process.env.JWT_EXPIRED_DURATION || 7,
        refreshTokenExpire: process.env.JWT_REFRESH_EXPIRED_DURATION || 14,
        accessTokenExpireUnit: process.env.JWT_EXPIRED_UNIT || "days",
        verifyEmailExpirationMinutes: 60
    },
    "smtp": {
        host: process.env.MAIL_HOST || null,
        port: process.env.MAIL_PORT || null,
        from: process.env.MAIL_FROM_ADDRESS || null,
        auth: {
            user: process.env.MAIL_USERNAME || null,
            pass: process.env.MAIL_PASSWORD || null,
        },
    },
    "googleApis": {
        service: "gmail",
        auth: {
            type: process.env.GOOGLE_API_TYPE || null,
            user: process.env.GOOGLE_API_USER_MAIL || null,
            clientId: process.env.GOOGLE_API_CLIENT_ID || null,
            clientSecret: process.env.GOOGLE_API_CLIENT_SECRET || null,
            refreshToken: process.env.GOOGLE_API_REFRESH_TOKEN || null,
            redirectUri: process.env.GOOGLE_API_REDIRECT_URI || null
        },
    },
    "midtrans": {
        "merchantId": process.env.MIDTRANS_MERCHANT_ID || null,
        "clientKey": process.env.MIDTRANS_CLIENT_KEY || null,
        "serverKey": process.env.MIDTRANS_SERVER_KEY || null
    },
    "port": process.env.APP_PORT || 3005,
    "photoPath": process.env.IMAGE_PATH || "src/resources/public/images",
    "frontEndPageResetPassword": process.env.FRONT_END_PAGE_RESET_PASSWORD || null,
    "frontEndPageVerifyEmail": process.env.FRONT_END_PAGE_VERIFY_EMAIL || null,
    "frontEndPageRedirectAfterPayment": process.env.FRONT_END_REDIRECT_WEBHOOK || null,
};

module.exports = { configApp }