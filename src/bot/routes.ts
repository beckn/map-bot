import express, { Router } from "express";
import { getBot, createBot, blockBot, goBot, stopBot, unblockBot } from ".";
import { response } from "../middleware";
const router: Router = express.Router();

const botRoutes = () => {
  router.post("/", createBot, response);
  router.get("/", getBot, response);
  router.put("/block", blockBot, response);
  router.put("/go", goBot, response);
  router.put("/stop", stopBot, response);
  router.put("/unblock", unblockBot, response);
  return router;
};

export { botRoutes };
