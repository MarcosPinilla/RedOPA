import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Colors, List, Avatar, IconButton } from 'react-native-paper';

const DELETE_AMIGO_MUTATION = gql`
  mutation deleteAmigo($amigo_id: ID!) {
    deleteAmigo(amigo_id: $amigo_id)
  }  
`;

function DeleteAmigoMutation (props) {

  const { id, handleChange } = props;
  const [deleteAmigo, { data, loading: mutationLoading, error: mutationError }] = useMutation(
    DELETE_AMIGO_MUTATION,
    {
      onCompleted({ response }) {
        handleChange('recargarAmigos', true);
      }
    }
  );

  if (mutationLoading) return <ActivityIndicator animating={true} color="#57457F" />;
  
  return (
    <IconButton 
      key={id}
      onPress={() => {
        deleteAmigo({ variables: { amigo_id: id } })
      }}
      icon="delete"
      color="#57457F"
    />
  );
}

export default DeleteAmigoMutation