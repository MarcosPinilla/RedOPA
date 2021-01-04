import gql from "graphql-tag";

export const EVENTOS = gql`
  query publicacionesAdminQuery($institucion_id: ID) {
    publicacionesAdminQuery(institucion_id: $institucion_id) {
      id,
      titulo,
      contenido,
      fecha,
      fotoUrl,
      visibilidad,
      interes{
        id
        nombre,
        descripcion,
        icono_url,
        categoria{
          nombre,
          descripcion,
          icono_url
        }
      }
    }
  }
`;
