import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Colors, List, Avatar, IconButton } from 'react-native-paper';

const DELETE_CONTACTO_MUTATION = gql`
  mutation deleteContacto($funcionario_id: ID!) {
    deleteContacto(funcionario_id: $funcionario_id)
  }  
`;

function DeleteContactoMutation (props) {

  const { id, handleChange } = props;
  const [deleteContacto, { data, loading: mutationLoading, error: mutationError }] = useMutation(
    DELETE_CONTACTO_MUTATION,
    {
      onCompleted({ response }) {
        handleChange('recargarContactos', true);
      }
    }
  );

  if (mutationLoading) return <ActivityIndicator animating={true} color="#57457F" />;
  
  return (
    <IconButton 
      key={id}
      onPress={() => {
        deleteContacto({ variables: { funcionario_id: id } })
      }}
      icon="delete"
      color="#57457F"
    />
  );
}

export default DeleteContactoMutation