import { IPost } from "@/types/types";
import { gql } from "@apollo/client";

export interface GetRecentPostsQueryResponse {
  posts: IPost[];
}

export const GET_RECENT_POSTS = gql`
  query GET_RECENT_POSTS {
    posts {
      id
      title
      content
      createdAt
      published
      user {
        id
        username
      }
    }
  }
`;
