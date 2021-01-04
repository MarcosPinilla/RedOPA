import gql from 'graphql-tag';

export const UMBRAL_RIESGO = gql`
  query umbralRiesgoQuery($institucion_id: ID) {
    umbralRiesgoQuery(institucion_id: $institucion_id)
  }
`;