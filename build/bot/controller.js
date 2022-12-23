"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unblockBot = exports.stopBot = exports.goBot = exports.blockBot = exports.createBot = exports.getBot = void 0;
const mongodb_1 = require("mongodb");
const _1 = require(".");
const lodash_1 = __importDefault(require("lodash"));
const getBot = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.getBot = getBot;
const createBot = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield _1.BotService.createBot();
        res.locals = {
            success: true,
            message: "Bot Creation Success!!",
            data
        };
        return next();
    }
    catch (error) {
        res.locals = {
            success: false,
            message: error.message,
            data: {}
        };
        return next();
    }
});
exports.createBot = createBot;
const blockBot = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authToken, orderId, subscriberUrl } = req.body;
    if (!authToken || !orderId || !subscriberUrl) {
        res.locals = {
            message: "Invalid data provided",
            success: false,
            status: 400,
            data: {}
        };
        return next();
    }
    try {
        const isAnyBotAlreadyAssigned = yield _1.BotService.getBot({
            order_id: orderId,
            status: _1.EBotStatus.BLOCKED
        });
        if (lodash_1.default.isArray(isAnyBotAlreadyAssigned) &&
            !lodash_1.default.isEmpty(isAnyBotAlreadyAssigned)) {
            res.locals = {
                message: "Bot is Already Assigned",
                success: false,
                status: 400,
                data: {}
            };
            return next();
        }
        const unblockedBots = yield _1.BotService.getBot({
            status: _1.EBotStatus.UNBLOCKED
        });
        if (lodash_1.default.isArray(unblockedBots) && !lodash_1.default.isEmpty(unblockedBots)) {
            const unblockedBot = unblockedBots[0];
            const updateBotResponse = yield _1.BotService.updateBot({
                _id: new mongodb_1.ObjectId(unblockedBot.id),
                status: _1.EBotStatus.UNBLOCKED
            }, {
                status: _1.EBotStatus.BLOCKED,
                subscriber_url: subscriberUrl,
                auth_token: authToken,
                order_id: orderId
            });
            if (updateBotResponse.modifiedCount) {
                res.locals = {
                    message: "Bot Blocked Success",
                    success: true,
                    data: {
                        status: "Blocked"
                    }
                };
            }
            else {
                res.locals = {
                    message: "Invalid Bots",
                    success: false,
                    status: 400
                };
            }
            return next();
        }
        else {
            res.locals = {
                message: "Out of Bots",
                success: false,
                status: 400,
                data: {}
            };
            return next();
        }
    }
    catch (error) {
        res.locals = {
            success: false,
            message: error.message,
            data: {}
        };
    }
});
exports.blockBot = blockBot;
const goBot = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId, location } = req.body;
    if (!orderId || !location) {
        res.locals = {
            message: "Invalid data provided",
            success: false,
            status: 400,
            data: {}
        };
        return next();
    }
    try {
        const assignedBot = yield _1.BotService.getBot({
            order_id: orderId,
            status: { $in: [_1.EBotStatus.BLOCKED, _1.EBotStatus.GOING] }
        });
        if (lodash_1.default.isEmpty(assignedBot)) {
            res.locals = {
                message: "Invalid Bots",
                success: false,
                status: 400,
                data: {}
            };
            return next();
        }
        const destLat = location.split(",")[0];
        const destLon = location.split(",")[1];
        const updateBotResponse = yield _1.BotService.updateBot({
            _id: new mongodb_1.ObjectId(assignedBot[0].id),
            order_id: orderId
        }, {
            dest_lat: destLat,
            dest_lon: destLon,
            status: _1.EBotStatus.GOING
        });
        res.locals = {
            success: true,
            message: "Bot Updated Success",
            data: {
                status: _1.EBotStatus.GOING
            }
        };
        return next();
    }
    catch (error) {
        res.locals = {
            success: false,
            message: error.message,
            data: {}
        };
        return next();
    }
});
exports.goBot = goBot;
const stopBot = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.body;
    if (!orderId) {
        res.locals = {
            success: false,
            message: "OrderID is required",
            status: 400
        };
        return next();
    }
    try {
        const assignedBot = yield _1.BotService.getBot({
            order_id: orderId,
            status: { $in: [_1.EBotStatus.BLOCKED, _1.EBotStatus.GOING] }
        });
        if (lodash_1.default.isEmpty(assignedBot)) {
            res.locals = {
                message: "Invalid Bots",
                success: false,
                status: 400,
                data: {}
            };
            return next();
        }
        const updateBotResponse = yield _1.BotService.updateBot({
            _id: new mongodb_1.ObjectId(assignedBot[0].id),
            order_id: orderId
        }, {
            status: _1.EBotStatus.STOPPED
        });
        if (updateBotResponse.modifiedCount) {
            res.locals = {
                success: true,
                message: "Bot Updated Success",
                data: {
                    status: _1.EBotStatus.STOPPED
                }
            };
        }
        else {
            res.locals = {
                success: false,
                message: "unable to stop bot",
                status: 400,
                data: {}
            };
        }
        return next();
    }
    catch (error) {
        res.locals = {
            success: false,
            message: error.message,
            data: {}
        };
        return next();
    }
});
exports.stopBot = stopBot;
const unblockBot = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.body;
    if (!orderId) {
        res.locals = {
            success: false,
            message: "OrderID is required",
            status: 400
        };
        return next();
    }
    try {
        const assignedBot = yield _1.BotService.getBot({
            order_id: orderId,
            status: _1.EBotStatus.STOPPED
        });
        if (lodash_1.default.isEmpty(assignedBot)) {
            res.locals = {
                message: "Invalid Bots",
                success: false,
                status: 400,
                data: {}
            };
            return next();
        }
        const updateBotResponse = yield _1.BotService.updateBot({
            _id: new mongodb_1.ObjectId(assignedBot[0].id),
            order_id: orderId
        }, {
            status: _1.EBotStatus.UNBLOCKED,
            subscriber_url: "",
            dest_lat: "",
            auth_token: "",
            dest_lon: "",
            order_id: ""
        });
        if (updateBotResponse.modifiedCount) {
            res.locals = {
                success: true,
                message: "Bot Updated Success",
                data: {
                    status: _1.EBotStatus.UNBLOCKED
                }
            };
        }
        else {
            res.locals = {
                success: false,
                message: "unable to unblock bot",
                status: 400,
                data: {}
            };
        }
        return next();
    }
    catch (error) {
        res.locals = {
            success: false,
            message: error.message,
            data: {}
        };
        return next();
    }
});
exports.unblockBot = unblockBot;
