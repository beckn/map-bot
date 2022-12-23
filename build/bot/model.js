"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.botSchema = exports.EBotStatus = exports.models = void 0;
const mongoose_1 = require("mongoose");
var EBotStatus;
(function (EBotStatus) {
    EBotStatus["UNBLOCKED"] = "UNBLOCKED";
    EBotStatus["BLOCKED"] = "BLOCKED";
    EBotStatus["GOING"] = "GOING";
    EBotStatus["STOPPED"] = "STOPPED";
})(EBotStatus || (EBotStatus = {}));
exports.EBotStatus = EBotStatus;
const botSchema = new mongoose_1.Schema({
    order_id: { type: String, required: false, default: "" },
    auth_token: { type: String, required: false, default: "" },
    cur_lat: { type: String, required: false, default: "" },
    cur_lon: { type: String, required: false, default: "" },
    dest_lat: { type: String, required: false, default: "" },
    dest_lon: { type: String, required: false, default: "" },
    status: {
        type: String,
        required: true,
        default: EBotStatus.UNBLOCKED,
        enum: EBotStatus
    },
    subscriber_url: { type: String, required: false, default: "" }
});
exports.botSchema = botSchema;
const Bot = (0, mongoose_1.model)("bots", botSchema);
const models = {
    Bot
};
exports.models = models;
