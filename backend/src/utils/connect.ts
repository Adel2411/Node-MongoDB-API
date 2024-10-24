import mongoose from "mongoose";
import logger from "./logger";
import dotenv from "dotenv";

dotenv.config();

async function connect() {
  const dbUri = process.env.DB_URI as string;
  return mongoose
    .connect(dbUri)
    .then(() => {
      logger.info("Connected to database");
    })
    .catch((error) => {
      logger.error("Database connection failed. Exiting now...");
      logger.error(error);
      process.exit(1);
    });
}

export default connect;
