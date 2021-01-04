import gql from "graphql-tag";

export const ALUMNOS = gql`
query alumnosExcelQuery($institucion_id: ID) {
  alumnosExcelQuery(institucion_id: $institucion_id) {
    id,
    alias,
    riesgosDiarios {
      riesgo
    },
    cuenta{
      id,
      nombres,
      apellidos,
      rut,
      consentimiento,
      genero{
        id,
        nombre,
      }
    },
    curso{
      id,
      nivel,
      letra,
    },
    puebloIndigena{
      id,
      nombre,
    },
    orientacionSexual{
      id,
      nombre,
    },
    identidadGenero{
      id,
      nombre,
    },
    contactos{
      id,
    },    
    apoderados{
      id,
    },
    amigos{
      id,
    },
    intereses{
      id,
      nombre
    }
    evaluaciones{
      id,
      fecha,
      nivel,
      emocion{
        id
      },
      evaluador{
        id,
        funcionario {
          id
        },
        apoderado {
          id
        },
        alumno {
          id
        },
      }
    }
  }
}
`;