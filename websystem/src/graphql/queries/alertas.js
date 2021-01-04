import gql from 'graphql-tag';

export const ALERTAS = gql`
  query alertasQuery {
    alertasQuery {
      id
      mensaje
      fecha
      leida
      alumno {
        id
        cuenta {
          id
          rut
          nombres
          apellidos
          fotoUrl
        }
        riesgo
        curso {
          id
          nivel
          letra
        }
      }
    }
  }
`;