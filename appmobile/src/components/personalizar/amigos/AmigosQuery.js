import React from 'react';
import gql from 'graphql-tag';
import { View, StyleSheet } from 'react-native'
import { Divider, Avatar, List, ActivityIndicator} from 'react-native-paper';
import { useQuery } from '@apollo/react-hooks';
import DeleteAmigoMutation from './DeleteAmigoMutation';

const GET_AMIGOS = gql`
  query {
    amigos {
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

function AmigosQuery  (props) {
  const { handleChange, recargarAmigos } = props;
  const { data, loading, error, refetch } = useQuery(GET_AMIGOS);

  if (recargarAmigos) {
    refetch().then(() => handleChange('recargarAmigos', false));
  }

  if (loading) return <ActivityIndicator animating={true} color="#57457F" size="large" style={ styles.cargando } />;

  return (
    <View style={{flex:3, alignItems:'stretch'}}>
      <List.Section>
        {data?.amigos &&
          data.amigos.map(alumno => (
            <List.Item key={alumno.id} style={ styles.item }
              title={alumno.cuenta.nombres.split(' ')[0] + ' ' + alumno.cuenta.apellidos.split(' ')[0]}
              left={() => <Avatar.Image size={45} source={{uri: alumno.cuenta.fotoUrl}} />}
              right={() => <DeleteAmigoMutation id={alumno.id} handleChange={handleChange} />}
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

export default AmigosQuery;