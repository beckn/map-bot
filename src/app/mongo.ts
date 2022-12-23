import { connect } from "mongoose";

const connectMongo = async () => {
  const mongoURL = process.env.MONGO_URL_LOCAL || "";
  try {
    await connect(mongoURL);
    console.log("MongoDB connected!!");
  } catch (error: any) {
    console.log(error.message);
    process.exit(1);
  }
};

export { connectMongo };
