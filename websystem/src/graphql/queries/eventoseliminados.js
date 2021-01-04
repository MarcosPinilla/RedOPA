import gql from 'graphql-tag';

export const EVENTOS_ELIMINADOS = gql`
  query publicacionesEliminadasQuery($institucion_id: ID) {
    publicacionesEliminadasQuery(institucion_id: $institucion_id) {
      id
      titulo
      interes {
        nombre
      }
    }
  }
`;