import { userLoader } from "../loaders/userLoader";

interface PostParentType {
  authorId: number;
}

export const Post = {
  user: (parent: PostParentType, _: any) => {
    return userLoader.load(parent.authorId);
  },
};
