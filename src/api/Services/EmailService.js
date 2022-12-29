const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { configApp } = require("./../../config/app");

const oAuth2Client = new google.auth.OAuth2(
    configApp.googleApis.auth.clientId, 
    configApp.googleApis.auth.clientSecret, 
    configApp.googleApis.auth.redirectUri
);
oAuth2Client.setCredentials({ refresh_token: configApp.googleApis.auth.refreshToken });

const sendEmail = async (to, subject, text) => {
    const accessToken = await oAuth2Client.getAccessToken();
    const auth = {
        type: configApp.googleApis.auth.type || null,
        user: configApp.googleApis.auth.user || null,
        clientId: configApp.googleApis.auth.clientId || null,
        clientSecret: configApp.googleApis.auth.clientSecret || null,
        refreshToken: configApp.googleApis.auth.refreshToken || null,
        accessToken: accessToken,
    };
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: auth
    });
    if (configApp.env !== "test") {
        transport
            .verify()
            .then(() => console.log("Connected to email server"))
            .catch(() => console.error("Unable to connect to email server. Make sure you have configured the SMTP options in .env"));
    }
    const message = {
        from: configApp.googleApis.auth.user,
        to,
        subject,
        text,
        html: text
    };
    const result = transport.sendMail(message);
    return result;
};
sendEmail().then((result) => console.log("Email sent... => ", result)).catch((error) => console.log("Error Fail : => ", error.message));
exports.sendResetPasswordEmail = async (to, token) => {
    const subject = "Setel ulang kata sandi";
    const resetPasswordUrl = `${configApp.frontEndPageResetPassword}?token=${token}`;
    const text = `<h2>Pengguna yang terhormat,
    Untuk menyetel ulang sandi Anda, klik tautan ini:  <a href="${resetPasswordUrl}">Form Reset Password</a>
    Jika Anda tidak meminta pengaturan ulang kata sandi, abaikan email ini.</h2>`;
    await sendEmail(to, subject, text);
};

exports.registrationVerifiedEmail = async (to, token) => {
    const subject = "Verifikasi Email";
    const verifyEmailUrl = `${configApp.frontEndPageVerifyEmail}?token=${token}`;
    const text = `<h2>Link Verifikasi Akun : <a href="${verifyEmailUrl}">Verifikasi Akun</a></h2>`;
    await sendEmail(to, subject, text);
};