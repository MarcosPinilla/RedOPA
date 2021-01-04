import gql from "graphql-tag";

export const INTERESES = gql`
  query {
    intereses {
      id,
      nombre,
      icono_url
    }
  }
`;