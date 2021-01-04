import gql from "graphql-tag";

export const USUARIOS_ACTIVOS = gql`
  query usuariosActivosQuery($institucion_id: ID) {
    usuariosActivosQuery(institucion_id: $institucion_id)
  }
`;