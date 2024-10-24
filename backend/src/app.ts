import express from "express";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import dotenv from "dotenv";
import deserializeUser from "./middleware/deserializeUser";

dotenv.config();

const port = process.env.PORT || 1337;

const app = express();

app.use(express.json());

app.use(deserializeUser);

app.listen(port, async () => {
  logger.info(`Server listening on port: ${port}`);

  await connect();

  routes(app);
});
