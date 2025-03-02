import { Context } from "../server";

interface ProfileParentType {
  id: number;
  bio: string;
  userId: number;
}

export const Profile = {
  user: async (parent: ProfileParentType, _: unknown, { prisma }: Context) => {
    return prisma.user.findUnique({
      where: { id: Number(parent.userId) },
    });
  },
};
