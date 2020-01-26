//@ts-check
const express = require("express");
const glob = require("glob");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const compress = require("compression");
const methodOverride = require("method-override");
const expressVue = require("express-vue");
const path = require("path");

/**
 *
 * @param {object} app
 * @param {object} config
 */
module.exports.init = async (app, config) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true,
    }));
    app.use(compress());
    app.use(cookieParser());
    app.use(methodOverride());

    //ExpressVue Setup
    const vueOptions = {
        pagesPath: path.join(__dirname, "views")
    };

    // @ts-ignore
    const router = express.Router();
    await expressVue.use(app, vueOptions);

    app.use("/", router);

    glob
        .sync(config.root + "/controllers/**/*.js")
        .forEach((controller) => {
            require(controller)(router);
        });
};
