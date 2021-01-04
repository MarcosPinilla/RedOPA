import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Colors, List, Avatar, IconButton } from 'react-native-paper';

const DELETE_CONTACTO_EXTERNO_MUTATION = gql`
  mutation deleteContactoExterno($contacto_externo_id: ID!) {
    deleteContactoExterno(contacto_externo_id: $contacto_externo_id)
  }  
`;

function DeleteContactoExternoMutation (props) {

  const { id, handleChange } = props;
  const [deleteContactoExterno, { data, loading: mutationLoading, error: mutationError }] = useMutation(
    DELETE_CONTACTO_EXTERNO_MUTATION,
    {
      onCompleted({ response }) {
        handleChange('recargarContactosExternos', true);
      }
    }
  );

  if (mutationLoading) return <ActivityIndicator animating={true} color="#57457F" />;
  
  return (
    <IconButton 
      key={id}
      onPress={() => {
        deleteContactoExterno({ variables: { contacto_externo_id: id } })
      }}
      icon="delete"
      color="#57457F"
    />
  );
}

export default DeleteContactoExternoMutation