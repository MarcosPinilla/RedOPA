import gql from "graphql-tag";

export const EVALUACIONES_STATS = gql`
  query evaluacionesMensualesQuery($institucion_id: ID){
    evaluacionesMensualesQuery(institucion_id: $institucion_id){
      nombre,
      cantidad
    }
  }
`;