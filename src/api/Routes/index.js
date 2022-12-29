const express = require("express");
const router = express.Router();

let defaultRoutes = [
    {
        path: "/auth",
        route: require("./authentication")
    }
];

defaultRoutes.forEach((route) => {
    router.use(route["path"], route["route"]);
});

module.exports = router;