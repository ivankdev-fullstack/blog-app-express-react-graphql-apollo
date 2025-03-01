import JWT, { JwtPayload } from "jsonwebtoken";

interface UserJWTPayload extends JwtPayload {
  userId: number;
}

export const getUserFromToken = (token: string): UserJWTPayload | null => {
  try {
    return JWT.verify(token, process.env.JWT_SECRET!) as UserJWTPayload;
  } catch (err) {
    return null;
  }
};
