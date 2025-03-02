import { IProfile } from "@/types/types";
import { gql } from "@apollo/client";

export interface GetProfileQueryResponse {
  profile: Omit<IProfile, "id">;
}

export const GET_PROFILE = gql`
  query GET_PROFILE($userId: ID!) {
    profile(userId: $userId) {
      bio
      isMyProfile
      user {
        username
        posts {
          id
          title
          content
          published
          createdAt
        }
      }
    }
  }
`;
