import { models, EBotStatus, IBot } from "./index";

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
  createBot: async (
    status?: EBotStatus,
    order_id?: string,
    auth_token?: string,
    cur_lat?: string,
    cur_lon?: string,
    dest_lat?: string,
    dest_lon?: string,
    subscriber_url?: string
  ) => {
    const newBotInstance = new models.Bot({
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
  },
  getBot: async (conditions: any) => {
    return models.Bot.find(conditions, {});
  },
  updateBot: async (conditions: any, updatebotdata: IBot) => {
    return models.Bot.updateOne(conditions, updatebotdata);
  }
};

export { BotService };
