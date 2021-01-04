import gql from "graphql-tag";

export const INTERES_CURSOS = gql`
  query($institucion_id: ID) {
    interesesCursoQuery(institucion_id: $institucion_id) {
      nombre
      id
      cantidades {
        nombre
        cantidad
      }
    }
  }
`;