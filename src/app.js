require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fs = require("fs");
// const multer = require("multer");
// import any routes here!

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "/resources/public/images")));
app.use("/couriers", express.static(path.join(__dirname, "/resources/public/couriers")));
app.use("/storage", express.static(path.join(__dirname, "/resources/storage")));
app.use(cors());

const firstRoutes = require("./api/Routes");
const { configApp } = require("./config/app");
const package = JSON.parse(fs.readFileSync("./package.json", "utf8"));

app.get("/", (request, response) => {
    response.send({ code: 200, status: "OK", message: "Api already running! :)", version: package.version || null });
});

app.use("/", firstRoutes);
app.use("*", (request, response) => response.status(404).send({ code: 404, status: "NotFound", message: "Resource url tidak ditemukan" }));
app.use(async (request, response, next) => next(Error("Internet Server Error")));
app.use(async (error, request, response, next) => {
    // delete request file image if request is not valid
    if (request.file) {
        if (request.file["filename"]) {
            const oldPhoto = `${configApp["photoPath"]}/${request["file"]["filename"]}`;
            if (fs.existsSync(oldPhoto)) {
                fs.unlinkSync(oldPhoto);
            }
        }
    }
    if (error.name === "SequelizeValidationError") {
        response.status(400).send({
            code: 400,
            status: "BadRequest",
            message: error.message,
        });
    }
    console.log(`Big Error => `, error);
    response.status(error["status"] || 500).send({
        code: error["status"] || 500,
        status: error["name"] || "Error",
        message: error["message"] || "Resource tidak ditemukan, atau endpoint tidak ada",
    });
});

function print(path, layer) {
    if (layer.route) {
        layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))));
    } else if (layer.name === "router" && layer.handle.stack) {
        layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))));
    } else if (layer.method) {
        console.log(
            "%s /%s",
            layer.method.toUpperCase(),
            path.concat(split(layer.regexp)).filter(Boolean).join("/")
        );
    }
}

function split(thing) {
    if (typeof thing === "string") {
        return thing.split("/");
    } else if (thing.fast_slash) {
        return "";
    } else {
        var match = thing
            .toString()
            .replace("\\/?", "")
            .replace("(?=\\/|$)", "$")
            .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
        return match
            ? match[1].replace(/\\(.)/g, "$1").split("/")
            : "<complex:" + thing.toString() + ">";
    }
}

app._router.stack.forEach(print.bind(null, []));

const port = process.env.APP_PORT || 3003;
const appUrl = process.env.APP_URL || "http://localhost:3003";
app.listen(port, () => console.log(`Server listening at ${appUrl}`));
