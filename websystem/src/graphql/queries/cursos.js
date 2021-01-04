import gql from "graphql-tag";

export const CURSOS = gql`
  query cursosInstitucionQuery($institucion_id: ID){
    cursosInstitucionQuery(institucion_id: $institucion_id) {
      id,
      nivel
      letra
    }
  }
`;