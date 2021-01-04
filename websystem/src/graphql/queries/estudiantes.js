import gql from "graphql-tag";

export const ALUMNOS = gql`
  query alumnos($institucion_id: ID, $course_id: ID,  $offset: Int, $limit: Int) {
    alumnos(institucion_id: $institucion_id, course_id: $course_id, offset: $offset, limit: $limit) {
      totalItems,
      items {
        id,
        cuenta{
          id,
          rut,
          nombres,
          apellidos,
          estado,
          telefono,
          email,
          institucion{
            nombre
          }
        },
        curso{
          id,
          nivel,
          letra
        }
      }
    }
  }
`;