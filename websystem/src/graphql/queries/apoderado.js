import gql from "graphql-tag";

export const APODERADO = gql`
  query apoderadoQuery($id: ID!) {
    apoderadoQuery (id: $id) {
      id
      cuenta {
        id
        nombres
        apellidos
        rut
        fotoUrl
        telefono
        email
        evaluaciones {
          id
          fecha
          nivel
          emocion {
            nombre
          }
          alumno {
            cuenta {
              nombres
              apellidos
            }
          }
        }
      }
      pupilos {
        id
        alias
        cuenta {
          id
          nombres
          apellidos
          rut
          fotoUrl
          telefono
          email
        }
      }
    }
  }
`