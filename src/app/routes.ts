import express, { Router, Request, Response } from "express";
const router: Router = express.Router();
const routes = () => {
  router.use("/bot", (req: Request, res: Response) => {
    return res.json({
      success: false
    });
  });

  return router;
};

export { routes };
