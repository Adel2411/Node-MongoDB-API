import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 1337,
  dbUri: process.env.DB_URI || "",
  saltWorkFactor: parseInt(process.env.SALT_WORK_FACTOR || "10") || 10,
  accessTokenTtl: process.env.ACCESS_TOKEN_TTL || "",
  refreshTokenTtl: process.env.REFRESH_TOKEN_TTL || "",
  publicKey: process.env.PUBLIC_KEY || "",
  privateKey: process.env.PRIVATE_KEY || "",
};
