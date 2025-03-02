import { userLoader } from "../loaders/userLoader";

interface PostParentType {
  authorId: number;
}

export const Post = {
  user: async (parent: PostParentType) => {
    return await userLoader.load(parent.authorId);
  },
};
