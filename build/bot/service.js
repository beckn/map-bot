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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotService = void 0;
const index_1 = require("./index");
// interface IBot {
//     _id: Types.ObjectId;
//     order_id?: string;
//     auth_token?: string;
//     cur_lat?: string;
//     cur_lon?: string;
//     dest_lat?: string;
//     dest_lon?: string;
//     status: EBotStatus;
//     subscriber_url?: string;
//   }
const BotService = {
    createBot: (status, order_id, auth_token, cur_lat, cur_lon, dest_lat, dest_lon, subscriber_url) => __awaiter(void 0, void 0, void 0, function* () {
        const newBotInstance = new index_1.models.Bot({
            status,
            order_id,
            auth_token,
            cur_lat,
            cur_lon,
            dest_lat,
            dest_lon,
            subscriber_url
        });
        return newBotInstance.save();
    }),
    getBot: (conditions) => __awaiter(void 0, void 0, void 0, function* () {
        return index_1.models.Bot.find(conditions, {});
    }),
    updateBot: (conditions, updatebotdata) => __awaiter(void 0, void 0, void 0, function* () {
        return index_1.models.Bot.updateOne(conditions, updatebotdata);
    })
};
exports.BotService = BotService;
