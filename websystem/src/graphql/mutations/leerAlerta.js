import gql from 'graphql-tag';

export const LEER_ALERTA = gql`
  mutation leerAlerta($publicacion_id: ID!) {
    leerAlerta(publicacion_id: $publicacion_id)
  }
`;