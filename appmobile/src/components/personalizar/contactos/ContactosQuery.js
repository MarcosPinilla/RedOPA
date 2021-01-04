import React from 'react';
import gql from 'graphql-tag';
import { View, StyleSheet } from 'react-native'
import { Avatar, List, ActivityIndicator } from 'react-native-paper';
import { useQuery } from '@apollo/react-hooks';
import DeleteContactoMutation from './DeleteContactoMutation';

const GET_CONTACTOS = gql`
  query {
    contactos {
      id,
      cuenta{
        nombres,
        apellidos,
        rut,
        fotoUrl,
        institucion{
          nombre,
          rut,
          direccion
        }
      }
    }
  }
`

function ContactosQuery (props) {
  const { handleChange, recargarContactos } = props;
  const { data, loading, error, refetch } = useQuery(GET_CONTACTOS);

  if (recargarContactos) {
    refetch().then(() => handleChange('recargarContactos', false));
  }

  if (loading) return <ActivityIndicator animating={true} color="#57457F" size="large" style={ styles.cargando } />;

  return (
    <View style={{flex:3, alignItems:'stretch'}}>
      <List.Section>
        {data.contactos &&
          data.contactos.map(funcionario => (
            <List.Item key={funcionario.id}
              title={funcionario.cuenta.nombres.split(' ')[0] + ' ' + funcionario.cuenta.apellidos.split(' ')[0]}
              left={() => <Avatar.Image size={45} source={{uri: funcionario.cuenta.fotoUrl}} />}
              right={() => <DeleteContactoMutation id={funcionario.id} handleChange={handleChange} />}
            />
        ))}
      </List.Section>  
    </View>
  )
}

const styles = StyleSheet.create({
  cargando: {
    marginTop: 50
  }
});

export default ContactosQuery;