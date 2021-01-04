import gql from 'graphql-tag';

export const ALUMNOS_ELIMINADOS = gql`
  query alumnosEliminadosQuery($institucion_id: ID){
    alumnosEliminadosQuery(institucion_id: $institucion_id) {
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