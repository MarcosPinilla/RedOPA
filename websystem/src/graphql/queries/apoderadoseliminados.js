import gql from 'graphql-tag';

export const APODERADOS_ELIMINADOS = gql`
  query apoderadosEliminadosQuery($institucion_id: ID) {
    apoderadosEliminadosQuery(institucion_id: $institucion_id) {
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