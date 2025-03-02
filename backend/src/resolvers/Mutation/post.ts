import { Post, Prisma } from ".prisma/client";
import { Context } from "../../server";
import { canUserMutatePost } from "../../utils/canUserMutatePost";

interface PostArgs {
  post: {
    title?: string;
    content?: string;
  };
}

interface PostPayloadType {
  errors: {
    message: string;
  }[];
  post: Post | Prisma.Prisma__PostClient<Post> | null;
}

const handleUnauthenticated = (): PostPayloadType => ({
  errors: [{ message: "Forbidden access (unauthenticated)" }],
  post: null,
});

const handlePostNotFound = (): PostPayloadType => ({
  errors: [{ message: "Post does not exist" }],
  post: null,
});

const handleMissingFields = (message: string): PostPayloadType => ({
  errors: [{ message }],
  post: null,
});

export const postResolvers = {
  postCreate: async (
    _: any,
    { post }: PostArgs,
    { prisma, userInfo }: Context
  ): Promise<PostPayloadType> => {
    if (!userInfo) return handleUnauthenticated();

    const { title, content } = post;
    if (!title || !content) {
      return handleMissingFields(
        "You must provide title and content to create a post"
      );
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId: userInfo.userId,
      },
    });

    return { errors: [], post: newPost };
  },

  postUpdate: async (
    _: any,
    { post, postId }: { postId: string; post: PostArgs["post"] },
    { prisma, userInfo }: Context
  ): Promise<PostPayloadType> => {
    if (!userInfo) return handleUnauthenticated();

    const error = await canUserMutatePost({
      userId: userInfo.userId,
      postId: Number(postId),
      prisma,
    });
    if (error.errors.length) return error;

    const { title, content } = post;
    if (!title && !content) {
      return handleMissingFields("Need to have at least one field to update");
    }

    const existingPost = await prisma.post.findUnique({
      where: { id: Number(postId) },
    });
    if (!existingPost) return handlePostNotFound();

    const payloadToUpdate: Partial<Post> = {};

    if (title) payloadToUpdate.title = title;
    if (content) payloadToUpdate.content = content;

    const updatedPost = await prisma.post.update({
      data: payloadToUpdate,
      where: { id: Number(postId) },
    });

    return { errors: [], post: updatedPost };
  },

  postDelete: async (
    _: any,
    { postId }: { postId: string },
    { prisma, userInfo }: Context
  ): Promise<PostPayloadType> => {
    if (!userInfo) return handleUnauthenticated();

    const error = await canUserMutatePost({
      userId: userInfo.userId,
      postId: Number(postId),
      prisma,
    });
    if (error.errors.length) return error;

    const post = await prisma.post.findUnique({
      where: { id: Number(postId) },
    });
    if (!post) return handlePostNotFound();

    await prisma.post.delete({
      where: { id: Number(postId) },
    });

    return { errors: [], post };
  },

  postPublish: async (
    _: any,
    { postId }: { postId: string },
    { prisma, userInfo }: Context
  ): Promise<PostPayloadType> => {
    if (!userInfo) return handleUnauthenticated();

    const error = await canUserMutatePost({
      userId: userInfo.userId,
      postId: Number(postId),
      prisma,
    });
    if (error.errors.length) return error;

    const publishedPost = await prisma.post.update({
      where: { id: Number(postId) },
      data: { published: true },
    });

    return { errors: [], post: publishedPost };
  },

  postUnpublish: async (
    _: any,
    { postId }: { postId: string },
    { prisma, userInfo }: Context
  ): Promise<PostPayloadType> => {
    if (!userInfo) return handleUnauthenticated();

    const error = await canUserMutatePost({
      userId: userInfo.userId,
      postId: Number(postId),
      prisma,
    });
    if (error.errors.length) return error;

    const unpublishedPost = await prisma.post.update({
      where: { id: Number(postId) },
      data: { published: false },
    });

    return { errors: [], post: unpublishedPost };
  },
};
