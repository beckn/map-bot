"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
const response = (req, res) => {
    const { data, status = 200, success = true, message = "" } = res.locals || {};
    res.status(status || (success ? 200 : 500)).json({
        data,
        success,
        message: message || (success ? "" : "Oops! Something went wrong.")
    });
};
exports.response = response;
