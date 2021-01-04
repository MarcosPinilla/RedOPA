import React from 'react';
import gql from 'graphql-tag';
import { View, StyleSheet } from 'react-native'
import { ActivityIndicator } from 'react-native-paper';
import { useQuery } from '@apollo/react-hooks';
import CreateAmigoMutation from './CreateAmigoMutation';

const GET_NO_AMIGOS = gql`
  query noAmigosQuery {
    noAmigos {
      id,
      alias,
      cuenta{
        nombres,
        apellidos,
        rut,
        fotoUrl
      }
    }
  }
`

const noAmigosQuery = (props) => {
  const { handleChange, visible, hideDialog, nombre } = props;
  const { data, loading, error, refetch } = useQuery(GET_NO_AMIGOS);

  if (visible) {
    refetch();
  }

  const filtro = (alumno) => {
    if (nombre !== null && nombre !== ''){
      let reg = new RegExp('^' + nombre);
      if (alumno.cuenta.nombres.match(reg) || alumno.cuenta.apellidos.match(reg)) {
        return true
      }
      return false;
    } else {
      return true;
    }
  }

  if (loading) return <ActivityIndicator animating={true} color="#57457F" size="large" style={ styles.cargando } />;

  return (
    <View>
      {data.noAmigos && data.noAmigos.filter(filtro).map(alumno => (
        <CreateAmigoMutation
          alumno={alumno}
          handleChange={handleChange}
          hideDialog={hideDialog}
          key={alumno.id}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  cargando: {
    marginTop: 150
  }
});

export default noAmigosQuery;