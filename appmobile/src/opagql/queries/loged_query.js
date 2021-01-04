import gql from 'graphql-tag';

export const LOGED = gql`
    query {
        logueado {
            id,
            email,
            nombres,
            apellidos,
            telefono,
            rut,
            nacimiento,
            fotoUrl,
            institucion {
                nombre,
                fotoUrl
            },
            genero {
                nombre
            },
            alumno {
                id
                alias
            },
            apoderado {
                id
            },
            funcionario {
                id
            }
        }
    }
`;