import { IPost } from "@/types/types";
import { gql } from "@apollo/client";

export interface CreatePostMutationResponse {
  post: IPost;
  errors: {
    message: string;
  }[];
}

export const CREATE_POST = gql`
  mutation CREATE_POST($title: String!, $content: String!) {
    postCreate(post: { title: $title, content: $content }) {
      errors {
        message
      }
      post {
        title
        createdAt
        content
        user {
          username
        }
      }
    }
  }
`;
