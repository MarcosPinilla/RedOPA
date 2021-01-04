import React from 'react';
import gql from 'graphql-tag';
import { View, StyleSheet } from 'react-native'
import { ActivityIndicator } from 'react-native-paper';
import { useQuery } from '@apollo/react-hooks';
import CreateInteresAlumnoMutation from './CreateInteresAlumnoMutation';

const GET_NO_INTERESES = gql`
  query noInteresesQuery {
    noIntereses {
      id,
      nombre,
      descripcion,
      categoria {
        nombre
      }
    }
  }
`

const noInteresesQuery = (props) => {
  const { handleChange, visible, hideDialog } = props;
  const { data, loading, error, refetch } = useQuery(GET_NO_INTERESES);

  if (visible) {
    refetch();
  }

  if (loading) return <ActivityIndicator animating={true} color="#57457F" size="large" style={ styles.cargando } />;

  return (
    <View>
      {data.noIntereses && data.noIntereses.map(interes => (
        <CreateInteresAlumnoMutation
          interes={interes}
          handleChange={handleChange}
          hideDialog={hideDialog}
          key={interes.id}
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

export default noInteresesQuery;