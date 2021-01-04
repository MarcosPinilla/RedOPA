import gql from "graphql-tag";

export const APODERADOS = gql`
  query apoderado($institucion_id: ID ,$offset: Int, $limit: Int) {
    apoderadosInstitucion(institucion_id: $institucion_id, offset: $offset, limit: $limit) {
      totalItems,
      items {
        id,
        cuenta {
          id,
          rut,
          nombres,
          apellidos,
          nacimiento,
          telefono,
          estado,
          email
        }
      }
    }
  }
`;