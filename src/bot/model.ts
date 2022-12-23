import { Schema, model, Types } from "mongoose";

enum EBotStatus {
  UNBLOCKED = "UNBLOCKED",
  BLOCKED = "BLOCKED",
  GOING = "GOING",
  STOPPED = "STOPPED"
}

interface IBot {
  _id?: Types.ObjectId;
  order_id?: string;
  auth_token?: string;
  cur_lat?: string;
  cur_lon?: string;
  dest_lat?: string;
  dest_lon?: string;
  status: EBotStatus;
  subscriber_url?: string;
}

const botSchema = new Schema<IBot>({
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

const Bot = model<IBot>("bots", botSchema);

const models = {
  Bot
};
export { models, EBotStatus, botSchema, IBot };
