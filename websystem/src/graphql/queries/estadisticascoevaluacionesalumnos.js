import gql from "graphql-tag";

export const COEVALUACIONES_ALUMNOS = gql`
  query estadisticasCoevaluacionesAlumnos($institucion_id: ID, $periodo: String) {
    estadisticasCoevaluacionesAlumnos(institucion_id: $institucion_id, periodo: $periodo) {
      nombre,
      cantidad
    }
  }
`;