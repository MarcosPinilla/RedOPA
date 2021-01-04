import gql from "graphql-tag";

export const ALUMNOS = gql`
  query alumnosRiesgoQuery($institucion_id: ID){
    alumnosRiesgoQuery(institucion_id: $institucion_id){
      id,
      riesgosDiarios {
        id,
        riesgo
      }
      cuenta{
        id,
        rut,
        fotoUrl
        nombres,
        apellidos,
        estado,
        telefono,
        email,
        institucion{
          id
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