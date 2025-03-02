import { gql } from "@apollo/client";

interface AuthResponse {
  token: string;
  errors?: {
    message: string;
  }[];
}

export interface SigninMutationResponse {
  signin: AuthResponse;
}

export interface SignupMutationResponse {
  signup: AuthResponse;
}

export const SIGNIN = gql`
  mutation SIGNIN($email: String!, $password: String!) {
    signin(credentials: { email: $email, password: $password }) {
      token
    }
  }
`;

export const SIGNUP = gql`
  mutation SIGNUP(
    $email: String!
    $password: String!
    $username: String!
    $bio: String!
  ) {
    signup(
      credentials: { email: $email, password: $password }
      username: $username
      bio: $bio
    ) {
      errors {
        message
      }
      token
    }
  }
`;
