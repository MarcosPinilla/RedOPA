import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { StyleSheet, AsyncStorage } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';

const UPDATE_CONFIGURACION_PERFIL_MUTATION = gql`
  mutation updateConfiguracionPerfil($perfilConfigurado: Boolean!) {
    updateConfiguracionPerfil(perfilConfigurado: $perfilConfigurado)
  }
`;

const ConfirmacionMutation = (props) => {

  const { goTo } = props;

  const [updateConfiguracionPerfil, { data, loading: mutationLoading, error: mutationError }] = useMutation(
    UPDATE_CONFIGURACION_PERFIL_MUTATION,
    {
      onCompleted({ response }) {
        AsyncStorage.setItem('configurado', 'true');
        goTo('AlumnoDrawer');
      },
    },
  );

  if (mutationLoading) return <ActivityIndicator animating={true} size="large" color="#57457F" />;
  
  return (
    <Button
      style={ styles.confirmarButton }
      mode="contained"
      onPress={ () => updateConfiguracionPerfil({ variables: { perfilConfigurado: true } }) }
    >
      <Text style={ styles.confirmarText }>Iniciar OPA</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  confirmarButton: {
    borderRadius: 25,
    backgroundColor: '#B3FFFD',
    paddingHorizontal: 20,
  },
  confirmarText: {
    fontFamily: 'niramit-semibold',
    fontSize: 18,
    paddingBottom: 3,
  },
});

export default ConfirmacionMutation;