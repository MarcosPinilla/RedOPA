import gql from "graphql-tag";

export const AUTOEVALUACIONES_ALUMNOS = gql`
  query estadisticasAutoevaluacionesAlumnos($institucion_id: ID, $periodo: String) {
    estadisticasAutoevaluacionesAlumnos(institucion_id: $institucion_id, periodo: $periodo) {
      nombre,
      cantidad
    }
  }
`;