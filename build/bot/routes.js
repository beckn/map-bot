"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.botRoutes = void 0;
const express_1 = __importDefault(require("express"));
const _1 = require(".");
const middleware_1 = require("../middleware");
const router = express_1.default.Router();
const botRoutes = () => {
    router.post("/", _1.createBot, middleware_1.response);
    router.get("/", _1.getBot, middleware_1.response);
    router.put("/block", _1.blockBot, middleware_1.response);
    router.put("/go", _1.goBot, middleware_1.response);
    router.put("/stop", _1.stopBot, middleware_1.response);
    router.put("/unblock", _1.unblockBot, middleware_1.response);
    return router;
};
exports.botRoutes = botRoutes;
