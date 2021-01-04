import React from 'react';
import gql from 'graphql-tag';
import { View, StyleSheet } from 'react-native'
import { ActivityIndicator } from 'react-native-paper';
import { useQuery } from '@apollo/react-hooks';
import CreateContactoMutation from './CreateContactoMutation';

const GET_NO_CONTACTOS = gql`
  query noContactosQuery {
    noContactos {
      id,
      cuenta{
        nombres,
        apellidos,
        rut,
        fotoUrl,
      }
    }
  }
`

const noContactosQuery = (props) => {
  const { handleChange, visible, hideDialog, nombre } = props;
  const { data, loading, error, refetch } = useQuery(GET_NO_CONTACTOS);

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
  console.log(data.noContactos);

  return (
    <View>
      {data.noContactos && data.noContactos.filter(filtro).map(funcionario => (
        <CreateContactoMutation
          funcionario={funcionario}
          handleChange={handleChange}
          hideDialog={hideDialog}
          key={funcionario.id}
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

export default noContactosQuery;