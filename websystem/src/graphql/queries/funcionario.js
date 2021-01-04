import gql from "graphql-tag";

export const FUNCIONARIO = gql`
  query funcionarioQuery($id: ID!) {
    funcionarioQuery (id: $id) {
      id
      cargo
      cuenta {
        id
        nombres
        apellidos
        rut
        fotoUrl
        telefono
        email,
        permiso {
          id,
          nombre,
        },
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
    }
  }
`