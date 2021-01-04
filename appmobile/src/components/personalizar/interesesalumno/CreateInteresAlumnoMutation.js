import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Colors, List, Avatar, Text } from 'react-native-paper';

const CREATE_INTERES_ALUMNO_MUTATION = gql`
  mutation createInteresAlumno($interes_id: ID!) {
    createInteresAlumno(interes_id: $interes_id) {
      id
    }
  }  
`;

const CreateInteresAlumnoMutation = (props) => {

  const { interes, handleChange, hideDialog } = props;
  const [createInteresAlumno, { data, loading: mutationLoading, error: mutationError }] = useMutation(
    CREATE_INTERES_ALUMNO_MUTATION,
    {
      onCompleted({ response }) {
        hideDialog();
        handleChange('recargarInteresesAlumno', true);
      }
    }
  );

  if (mutationLoading) {
    return (
      <List.Item
        key="1"
        style={ styles.item }
        title="Agregando interés"
        left={() => <Avatar.Image key="1" size={45} theme={{ colors: { primary: '#F6F6F6' } }} />}
      />
    );
  }

  if (mutationError) {
    let error = '';
    if (mutationError.message.toString() === 'GraphQL error: No se pueden agregar más intereses') {
      error = 'Límite de intereses alcanzado';
    } else {
      error = 'Error del servidor';
    }

    return (
      <View>
        <List.Item key={interes.id}
          title={interes.nombre}
          description={interes.categoria.nombre}
          onPress={() => {
            createInteresAlumno({ variables: { interes_id: interes.id } })
          }}
          left={() => <Avatar.Text size={45} color="#B3FFFD" label={interes.nombre.slice(0, 1)} />}
        />
        <Text style={styles.textError}> {error} </Text>
      </View>
    );
  }
  
  return (
    <List.Item key={interes.id}
      title={interes.nombre}
      description={interes.categoria.nombre}
      onPress={() => {
        createInteresAlumno({ variables: { interes_id: interes.id } })
      }}
      left={() => <Avatar.Text size={45} color="#B3FFFD" label={interes.nombre.slice(0, 1)} />}
    />
  );
}

const styles = StyleSheet.create({
  item: {
  },
  textError : {
    marginTop: -20,
    marginLeft: 53,
    fontSize: 12,
    color: 'red',
    borderRadius: 25,
    width: '80%',
    textAlign: 'center'
  },
});

export default CreateInteresAlumnoMutation