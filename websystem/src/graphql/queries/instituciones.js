import gql from 'graphql-tag';

export const INSTITUCIONES = gql`
  query {
    instituciones {
      id
      nombre
    }
  }
`;