import gql from "graphql-tag";

export const APODERADOS_SEARCH = gql`
  query searchApoderadosInstitucion($textSearch: String, $institucion_id: ID) {
    searchApoderadosInstitucion(textSearch: $textSearch, institucion_id: $institucion_id) {
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
`;