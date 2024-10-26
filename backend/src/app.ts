import connect from "./utils/connect";
import logger from "./utils/logger";
import createServer from "./utils/server";
import config from "config";

const port = config.get<number>("port");

const app = createServer();

app.listen(port, async () => {
  logger.info(`Server listening on port: ${port}`);

  await connect();
});
