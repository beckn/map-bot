"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initApp = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const _1 = require(".");
const initApp = ({ app }) => {
    const router = express_1.default.Router();
    dotenv_1.default.config();
    app.use((0, cors_1.default)());
    app.use(express_1.default.urlencoded());
    app.use(express_1.default.json());
    app.use(router);
    (0, _1.connectMongo)();
    router.use("/ping", (req, res) => {
        res.json({
            status: 200,
            message: "Ping successfully"
        });
    });
    router.use("/api", (0, _1.routes)());
    app.listen(process.env.DEV_PORT, () => {
        console.log(`Server Started at Port:${process.env.DEV_PORT}`);
    });
};
exports.initApp = initApp;
