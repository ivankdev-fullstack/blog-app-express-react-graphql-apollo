import { Context } from "../server";

export const Query = {
  me: async (_: any, __: any, { userInfo, prisma }: Context) => {
    if (!userInfo) return null;

    return prisma.user.findUnique({
      where: { id: Number(userInfo.userId) },
    });
  },

  profile: async (
    _: any,
    { userId }: { userId: number },
    { prisma, userInfo }: Context
  ) => {
    const isMyProfile = Number(userId) === userInfo?.userId;
    const profile = await prisma.profile.findUnique({
      where: { userId: Number(userId) },
    });

    if (!profile) return null;

    return { ...profile, isMyProfile };
  },

  posts: (_: any, __: any, { prisma }: Context) => {
    return prisma.post.findMany({
      where: { published: true },
      orderBy: [{ createdAt: "desc" }],
    });
  },
};
