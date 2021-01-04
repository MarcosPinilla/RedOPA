import React from 'react';
import gql from 'graphql-tag';
import { View, StyleSheet } from 'react-native'
import { Divider, Avatar, List, ActivityIndicator} from 'react-native-paper';
import { useQuery } from '@apollo/react-hooks';
import DeleteInteresAlumnoMutation from './DeleteInteresAlumnoMutation';

const GET_INTERESES_ALUMNO = gql`
  query {
    interesesAlumno {
      id,
      nombre,
      categoria {
        nombre
      }
    }
  }
`

function InteresesAlumnoQuery  (props) {
  const { handleChange, recargarInteresesAlumno } = props;
  const { data, loading, error, refetch } = useQuery(GET_INTERESES_ALUMNO);

  if (recargarInteresesAlumno) {
    refetch().then(() => handleChange('recargarInteresesAlumno', false));
  }

  if (loading) return <ActivityIndicator animating={true} color="#57457F" size="large" style={ styles.cargando } />;

  return (
    <View style={{flex:3, alignItems:'stretch'}}>
      <List.Section>
        {data.interesesAlumno &&
          data.interesesAlumno.map(interes => (
            <List.Item key={interes.id}
            title={interes.nombre}
            description={interes.categoria.nombre}
            left={() => <Avatar.Text size={45} color="#B3FFFD" label={interes.nombre.slice(0, 1)} />}
            right={() => <DeleteInteresAlumnoMutation id={interes.id} handleChange={handleChange} />}
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

export default InteresesAlumnoQuery;