import React from 'react';
import gql from 'graphql-tag';
import { View, StyleSheet } from 'react-native'
import { Divider, Avatar, List, ActivityIndicator } from 'react-native-paper';
import { useQuery } from '@apollo/react-hooks';
import DeleteContactoExternoMutation from './DeleteContactoExternoMutation';

const GET_CONTACTOS_EXTERNOS = gql`
  query {
    contactosExternos {
      id,
      nombre,
      correo,
      telefono,
    }
  }
`

function ContactosExternosQuery  (props) {
  const { handleChange, recargarContactosExternos } = props;
  const { data, loading, error, refetch } = useQuery(GET_CONTACTOS_EXTERNOS);

  if (recargarContactosExternos) {
    refetch().then(() => handleChange('recargarContactosExternos', false));
  }

  if (loading) return <ActivityIndicator animating={true} color="#57457F" size="large" style={ styles.cargando } />;

  return (
    <View style={{flex:3, alignItems:'stretch'}}>
      <List.Section>
        {data.contactosExternos &&
          data.contactosExternos.map(contactoExterno => (
            <List.Item key={contactoExterno.id}
            title={contactoExterno.nombre}
            left={() => <Avatar.Text size={45} color="#B3FFFD" label={contactoExterno.nombre.slice(0, 1)} />}
            right={() => <DeleteContactoExternoMutation id={contactoExterno.id} handleChange={handleChange} />}
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


export default ContactosExternosQuery;