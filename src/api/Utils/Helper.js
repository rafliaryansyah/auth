const { configApp } = require("../../config/app");

const transformToUnix = (timestamp) => Math.floor(new Date(timestamp).getTime() / 1000);

const clientPhotoUrl = function(photo) {
    return `${configApp["url"]}/images/${photo}`;
};

const storageUrl = (photo) => `${configApp["url"]}/storage/${photo}`;

const imageUrlMobile = (imageName) => `${configApp["mobileUrl"]}/images/${imageName}`

const imageUrlMerchant = (imageName) => `${configApp["merchantUrl"]}/image/${imageName}`;

const imageUrlAdmin = (imageName) => `${configApp["urlAdmin"]}/image/${imageName}`;

const imageUrlMobileConditonUrl = (image) => {
    if(new RegExp("^(http|https)://", "i").test(image)) {
            return image;
    }
    return imageUrlMobile(image);
}

const sentenceToSlug = (Text) =>
    Text.toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

const createRandomString = () => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < 5; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
};

const getUiAvatarUser = (fullName) => {
    return `https://ui-avatars.com/api/?name=${fullName}`;
};

function slugToText(slug) {
    return slug.replace(/-/g, " ");
}

const midtransClient = () => {
    return new midtransClient.Snap({
        isProduction: false,
        serverKey: configApp.midtrans.serverKey,
        clientKey: configApp.midtrans.clientKey,
    });
};

const transactionStatuses = {
    1: "Menunggu Pembayaran",
    2: "Diproses",
    3: "Dikirim",
    4: "Tiba",
    5: "Selesai",
    6: "Gagal"
};

const humanizeRemoveUnderscore = (str) => {
    let index, frags = str.split("_");
    for (index = 0; index < frags.length; index++) {
        frags[index] = frags[index].charAt(0).toUpperCase() + frags[index].slice(1);
    }
    return frags.join(" ");
};

module.exports = {
    transactionStatuses,
    imageUrlMobileConditonUrl,
    transformToUnix,
    clientPhotoUrl,
    createRandomString,
    sentenceToSlug,
    getUiAvatarUser,
    storageUrl,
    slugToText,
    midtransClient,
    imageUrlMobile,
    imageUrlMerchant,
    imageUrlAdmin,
    humanizeRemoveUnderscore
};