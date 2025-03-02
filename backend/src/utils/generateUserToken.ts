import * as dotenv from "dotenv";
import JWT from "jsonwebtoken";
dotenv.config();

export const generateUserToken = (userId: number): string =>
  JWT.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: 3600000 });
