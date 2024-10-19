import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

async function connect() {
  const dbUri = config.get<string>("dbUri");
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
