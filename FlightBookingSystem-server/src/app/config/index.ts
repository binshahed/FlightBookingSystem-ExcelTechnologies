import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  saltRound: process.env.SALT_ROUND,
  jwtSecret: process.env.JWT_SECRET_KEY,
  admin_password: process.env.ADMIN_PASSWORD
};
