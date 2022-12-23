import express, {
  Express,
  Router,
  NextFunction,
  Request,
  Response
} from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectMongo, routes } from ".";

interface InitAppInterface {
  app: Express;
}

const initApp = ({ app }: InitAppInterface) => {
  const router: Router = express.Router();
  dotenv.config();
  app.use(cors());
  app.use(express.urlencoded());
  app.use(express.json());
  app.use(router);
  connectMongo();
  router.use("/ping", (req: Request, res: Response) => {
    res.json({
      status: 200,
      message: "Ping successfully"
    });
  });

  router.use("/api", routes());

  app.listen(process.env.DEV_PORT, () => {
    console.log(`Server Started at Port:${process.env.DEV_PORT}`);
  });
};

export { initApp };
