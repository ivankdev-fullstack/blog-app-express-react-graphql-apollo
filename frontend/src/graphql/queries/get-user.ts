import { IUser } from "@/types/types";
import { gql } from "@apollo/client";

export interface GetUserQueryResponse {
  me: IUser;
}

export const GET_USER = gql`
  query GET_USER {
    me {
      id
      name
      email
    }
  }
`;
