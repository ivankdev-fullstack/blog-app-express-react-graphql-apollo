import * as dotenv from "dotenv";
import JWT, { JwtPayload } from "jsonwebtoken";
dotenv.config();

interface UserJWTPayload extends JwtPayload {
  userId: number;
}

export const getUserFromToken = (token: string): UserJWTPayload | null => {
  try {
    const decodedToken = JWT.verify(
      token,
      process.env.JWT_SECRET!
    ) as UserJWTPayload;
    return decodedToken;
  } catch {
    return null;
  }
};
