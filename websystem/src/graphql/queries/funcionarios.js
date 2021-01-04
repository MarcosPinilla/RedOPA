import gql from "graphql-tag";

export const FUNCIONARIOS = gql`
  query funcionarios($institucion_id: ID, $offset: Int, $limit: Int) {
    funcionarios(institucion_id: $institucion_id, offset: $offset, limit: $limit) {
      totalItems,
    	items {
        id,
        cuenta{
          id,
          rut,
          nombres,
          apellidos,
          estado,
          email,
          telefono,
          genero {
            id,
            nombre
          },
          permiso {
            id,
            nombre
          },
          institucion{
            nombre
          }
        },
        cargo
      }
    }
  }
`;
