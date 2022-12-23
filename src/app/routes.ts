import express, { Router, Request, Response } from "express";
import { botRoutes } from "../bot";
const router: Router = express.Router();
const routes = () => {
  router.use("/bot", botRoutes());
  return router;
};

export { routes };
