import gql from "graphql-tag";

export const FUNCIONARIO_SEARCH = gql`
query searchFuncionario($textSearch: String, $institucion_id: ID) {
    searchFuncionario(textSearch: $textSearch, institucion_id: $institucion_id) {
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
`;
