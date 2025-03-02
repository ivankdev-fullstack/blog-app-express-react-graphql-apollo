import { Context } from "../server";

interface UserParentType {
  id: number;
}

export const User = {
  posts: async (
    parent: UserParentType,
    _: any,
    { userInfo, prisma }: Context
  ) => {
    const isOwnProfile = parent.id === userInfo?.userId;
    const postFilter = {
      where: {
        authorId: parent.id,
        ...(isOwnProfile ? {} : { published: true }),
      },
      orderBy: [
        {
          createdAt: "desc" as const,
        },
      ],
    };

    return prisma.post.findMany(postFilter);
  },
};
