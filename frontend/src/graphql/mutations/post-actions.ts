import { gql } from "@apollo/client";

export const PUBLISH_POST = gql`
  mutation PUBLISH_POST($postId: ID!) {
    postPublish(postId: $postId) {
      post {
        title
      }
    }
  }
`;

export const UNPUBLISH_POST = gql`
  mutation UNPUBLISH_POST($postId: ID!) {
    postUnpublish(postId: $postId) {
      post {
        title
      }
    }
  }
`;
