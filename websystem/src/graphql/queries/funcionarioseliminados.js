import gql from 'graphql-tag';

export const FUNCIONARIOS_ELIMINADOS = gql`
  query funcionariosEliminadosQuery($institucion_id: ID) {
    funcionariosEliminadosQuery(institucion_id: $institucion_id) {
      id
      cuenta {
        id
        rut
        nombres
        apellidos
      }
    }
  }
`;