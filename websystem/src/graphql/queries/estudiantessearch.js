import gql from "graphql-tag";

export const ALUMNOS_SEARCH = gql`
query searchAlumno($textSearch: String, $institucion_id: ID, $course_id: ID) {
    searchAlumno(textSearch: $textSearch, institucion_id: $institucion_id, course_id: $course_id) {
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
`;