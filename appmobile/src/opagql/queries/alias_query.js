import gql from 'graphql-tag';

export const GET_ALIAS = gql`
  query {
    logueado {
      fotoUrl
      alumno {
        alias
      }
    }
  }
`;