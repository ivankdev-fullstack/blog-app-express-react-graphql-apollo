import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import { Context } from "../../server";
import { createErrorPayload } from "../../utils/createErrorPayload";
import { generateUserToken } from "../../utils/generateUserToken";
import { validateEmail, validatePassword } from "../../utils/inputValidators";
dotenv.config();

interface Credentials {
  email: string;
  password: string;
}

interface SignupArgs {
  credentials: Credentials;
  username: string;
  bio: string;
}

interface SigninArgs {
  credentials: Credentials;
}

export interface UserPayload {
  errors: { message: string }[];
  token: string | null;
}

export const authResolvers = {
  signup: async (
    _: any,
    { credentials, username, bio }: SignupArgs,
    { prisma }: Context
  ): Promise<UserPayload> => {
    const { email, password } = credentials;

    if (!validateEmail(email)) {
      return createErrorPayload("Invalid email");
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return createErrorPayload("This email has been already taken.");
    }
    if (!validatePassword(password)) {
      return createErrorPayload("Invalid password");
    }
    if (!username || !bio) {
      return createErrorPayload("Invalid username or bio");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, username, password: hashedPassword },
    });

    await prisma.profile.create({
      data: { bio, userId: user.id },
    });

    return {
      errors: [],
      token: generateUserToken(user.id.toString()),
    };
  },

  signin: async (
    _: any,
    { credentials }: SigninArgs,
    { prisma }: Context
  ): Promise<UserPayload> => {
    const { email, password } = credentials;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return createErrorPayload("Invalid credentials");
    }

    return {
      errors: [],
      token: generateUserToken(user.id.toString()),
    };
  },
};
