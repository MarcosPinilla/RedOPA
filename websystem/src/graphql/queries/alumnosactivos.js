import gql from "graphql-tag";

export const ALUMNOS_ACTIVOS = gql`
  query alumnosActivosQuery($institucion_id: ID) {
    alumnosActivosQuery(institucion_id: $institucion_id) {
      nombre,
      cantidad
    }
  }
`;