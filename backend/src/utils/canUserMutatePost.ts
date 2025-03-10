import { Context } from "../server";

interface CanUserMutatePostParams {
  userId: number;
  postId: number;
  prisma: Context["prisma"];
}

export const canUserMutatePost = async ({
  userId,
  postId,
  prisma,
}: CanUserMutatePostParams) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
  });

  if (!user) {
    return {
      errors: [{ message: "User not found" }],
      post: null,
    };
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post || post.authorId !== user.id) {
    return {
      errors: [{ message: "Post not owned by user" }],
      post: null,
    };
  }

  return { errors: [], post };
};
