import gql from "graphql-tag";

export const EVALUACIONES_APODERADOS = gql`
  query estadisticasEvaluacionesApoderados($institucion_id: ID, $periodo: String) {
    estadisticasEvaluacionesApoderados(institucion_id: $institucion_id, periodo: $periodo) {
      nombre,
      cantidad
    }
  }
`;