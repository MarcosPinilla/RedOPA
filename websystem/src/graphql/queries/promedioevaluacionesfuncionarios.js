import gql from "graphql-tag";

export const PROMEDIO_FUNCIONARIOS = gql`
  query promedioEvaluacionesFuncionarios($institucion_id: ID, $periodo: String) {
    promedioEvaluacionesFuncionarios(institucion_id: $institucion_id, periodo: $periodo)
  }
`;