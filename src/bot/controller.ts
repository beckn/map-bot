import e, { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import { BotService, EBotStatus } from ".";
import _ from "lodash";

const getBot = async () => {};

const createBot = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await BotService.createBot();
    res.locals = {
      success: true,
      message: "Bot Creation Success!!",
      data
    };
    return next();
  } catch (error: any) {
    res.locals = {
      success: false,
      message: error.message,
      data: {}
    };
    return next();
  }
};

const blockBot = async (req: Request, res: Response, next: NextFunction) => {
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
    const isAnyBotAlreadyAssigned = await BotService.getBot({
      order_id: orderId,
      status: EBotStatus.BLOCKED
    });
    if (
      _.isArray(isAnyBotAlreadyAssigned) &&
      !_.isEmpty(isAnyBotAlreadyAssigned)
    ) {
      res.locals = {
        message: "Bot is Already Assigned",
        success: false,
        status: 400,
        data: {}
      };
      return next();
    }
    const unblockedBots = await BotService.getBot({
      status: EBotStatus.UNBLOCKED
    });
    if (_.isArray(unblockedBots) && !_.isEmpty(unblockedBots)) {
      const unblockedBot = unblockedBots[0];
      const updateBotResponse = await BotService.updateBot(
        {
          _id: new ObjectId(unblockedBot.id),
          status: EBotStatus.UNBLOCKED
        },
        {
          status: EBotStatus.BLOCKED,
          subscriber_url: subscriberUrl,
          auth_token: authToken,
          order_id: orderId
        }
      );
      if (updateBotResponse.modifiedCount) {
        res.locals = {
          message: "Bot Blocked Success",
          success: true,
          data: {
            status: "Blocked"
          }
        };
      } else {
        res.locals = {
          message: "Invalid Bots",
          success: false,
          status: 400
        };
      }
      return next();
    } else {
      res.locals = {
        message: "Out of Bots",
        success: false,
        status: 400,
        data: {}
      };
      return next();
    }
  } catch (error: any) {
    res.locals = {
      success: false,
      message: error.message,
      data: {}
    };
  }
};

const goBot = async (req: Request, res: Response, next: NextFunction) => {
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
    const assignedBot = await BotService.getBot({
      order_id: orderId,
      status: { $in: [EBotStatus.BLOCKED, EBotStatus.GOING] }
    });
    if (_.isEmpty(assignedBot)) {
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
    const updateBotResponse = await BotService.updateBot(
      {
        _id: new ObjectId(assignedBot[0].id),
        order_id: orderId
      },
      {
        dest_lat: destLat,
        dest_lon: destLon,
        status: EBotStatus.GOING
      }
    );
    res.locals = {
      success: true,
      message: "Bot Updated Success",
      data: {
        status: EBotStatus.GOING
      }
    };
    return next();
  } catch (error: any) {
    res.locals = {
      success: false,
      message: error.message,
      data: {}
    };
    return next();
  }
};

const stopBot = async (req: Request, res: Response, next: NextFunction) => {
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
    const assignedBot = await BotService.getBot({
      order_id: orderId,
      status: { $in: [EBotStatus.BLOCKED, EBotStatus.GOING] }
    });
    if (_.isEmpty(assignedBot)) {
      res.locals = {
        message: "Invalid Bots",
        success: false,
        status: 400,
        data: {}
      };
      return next();
    }

    const updateBotResponse = await BotService.updateBot(
      {
        _id: new ObjectId(assignedBot[0].id),
        order_id: orderId
      },
      {
        status: EBotStatus.STOPPED
      }
    );
    if (updateBotResponse.modifiedCount) {
      res.locals = {
        success: true,
        message: "Bot Updated Success",
        data: {
          status: EBotStatus.STOPPED
        }
      };
    } else {
      res.locals = {
        success: false,
        message: "unable to stop bot",
        status: 400,
        data: {}
      };
    }
    return next();
  } catch (error: any) {
    res.locals = {
      success: false,
      message: error.message,
      data: {}
    };
    return next();
  }
};

const unblockBot = async (req: Request, res: Response, next: NextFunction) => {
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
    const assignedBot = await BotService.getBot({
      order_id: orderId,
      status: EBotStatus.STOPPED
    });

    if (_.isEmpty(assignedBot)) {
      res.locals = {
        message: "Invalid Bots",
        success: false,
        status: 400,
        data: {}
      };
      return next();
    }

    const updateBotResponse = await BotService.updateBot(
      {
        _id: new ObjectId(assignedBot[0].id),
        order_id: orderId
      },
      {
        status: EBotStatus.UNBLOCKED,
        subscriber_url: "",
        dest_lat: "",
        auth_token: "",
        dest_lon: "",
        order_id: ""
      }
    );
    if (updateBotResponse.modifiedCount) {
      res.locals = {
        success: true,
        message: "Bot Updated Success",
        data: {
          status: EBotStatus.UNBLOCKED
        }
      };
    } else {
      res.locals = {
        success: false,
        message: "unable to unblock bot",
        status: 400,
        data: {}
      };
    }
    return next();
  } catch (error: any) {
    res.locals = {
      success: false,
      message: error.message,
      data: {}
    };
    return next();
  }
};

export { getBot, createBot, blockBot, goBot, stopBot, unblockBot };
