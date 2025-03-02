import { UserPayload } from "../resolvers/Mutation/auth";

export const createErrorPayload = (message: string): UserPayload => ({
  errors: [{ message }],
  token: null,
});
