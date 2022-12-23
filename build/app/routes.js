"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const bot_1 = require("../bot");
const router = express_1.default.Router();
const routes = () => {
    router.use("/bot", (0, bot_1.botRoutes)());
    return router;
};
exports.routes = routes;
