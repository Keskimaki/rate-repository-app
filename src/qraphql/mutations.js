import { gql } from '@apollo/client';

export const GET_AUTHORIZATION = gql`
  mutation logIn($credentials: AuthorizeInput) {
    authorize(credentials: $credentials) {
      accessToken
    }
  }
`;