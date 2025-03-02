import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import JWT from "jsonwebtoken";
import validator from "validator";
import { Context } from "../../server";
dotenv.config();

interface SignupArgs {
  credentials: {
    email: string;
    password: string;
  };
  username: string;
  bio: string;
}

interface SigninArgs {
  credentials: {
    email: string;
    password: string;
  };
}

interface UserPayload {
  errors: {
    message: string;
  }[];
  token: string | null;
}

const { JWT_SECRET } = process.env;

export const authResolvers = {
  signup: async (
    _: any,
    { credentials, username, bio }: SignupArgs,
    { prisma }: Context
  ): Promise<UserPayload> => {
    const { email, password } = credentials;
    const isEmail = validator.isEmail(email);

    if (!isEmail) {
      return {
        errors: [
          {
            message: "Invalid email",
          },
        ],
        token: null,
      };
    }

    const isExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isExist) {
      return {
        errors: [
          {
            message: "This email has been already taken.",
          },
        ],
        token: null,
      };
    }

    const isValidPassword = validator.isLength(password, {
      min: 5,
    });

    if (!isValidPassword) {
      return {
        errors: [
          {
            message: "Invalid password",
          },
        ],
        token: null,
      };
    }

    if (!username || !bio) {
      return {
        errors: [
          {
            message: "Invalid username or bio",
          },
        ],
        token: null,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    await prisma.profile.create({
      data: {
        bio,
        userId: user.id,
      },
    });

    return {
      errors: [],
      token: JWT.sign(
        {
          userId: user.id,
        },
        JWT_SECRET!,
        {
          expiresIn: 3600000,
        }
      ),
    };
  },
  signin: async (
    _: any,
    { credentials }: SigninArgs,
    { prisma }: Context
  ): Promise<UserPayload> => {
    const { email, password } = credentials;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        errors: [{ message: "Invalid credentials" }],
        token: null,
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return {
        errors: [{ message: "Invalid credentials" }],
        token: null,
      };
    }

    return {
      errors: [],
      token: JWT.sign({ userId: user.id }, JWT_SECRET!, {
        expiresIn: 3600000,
      }),
    };
  },
};
