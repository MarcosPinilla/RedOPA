import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { View, AsyncStorage, StyleSheet } from 'react-native';
import { Button, Text, ActivityIndicator, Colors, List, Image } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';

const CREATE_EVALUACION_MUTATION = gql`
  mutation CreateEvaluacion($emocionId: ID!, $alumnoId: ID!, $permanente: Boolean!, $puede: Boolean!) {
    createEvaluacion(emocionId: $emocionId, alumnoId: $alumnoId, permanente: $permanente, puede: $puede) {
      fecha,
      nivel
    }
  }  
`;

const EvaluacionAmigoMutation = (props) => {

  const { idAlumno, idEmocion, permanente, puede, navigation, titulo } = props
  const [createEvaluacion, { data, loading: mutationLoading, error: mutationError }] = useMutation(
    CREATE_EVALUACION_MUTATION,
    {
      onCompleted({ createEvaluacion}) {
        navigation.navigate('EvaluacionAmigoCompleta', {props})
      }
    }
  );

  if (mutationLoading) return <ActivityIndicator animating={true} color="#57457F" style={{width: 200}}/>;
  if (mutationError) return <Text style={styles.textError}>Upss, ya lo evaluaste</Text>
  
  return (
    <Button
      title="evaluacion"
      mode="contained"
      theme={{ roundness: 25, colors: { primary: '#fff', text:'#57457F'} }}
      style= {styles.button}
      onPress={() => {
        createEvaluacion({ variables: { emocionId: idEmocion, alumnoId: idAlumno, permanente: permanente, puede: puede } })
      }}
    >
      <Text style={ styles.buttonText }>{titulo}</Text>
      
    </Button>
);
}

const styles = StyleSheet.create({
view: {
  padding: 10, 
  width: '100%',
  alignItems: 'center',
},
button: {
  margin: 10,
  height: 50,
  width: 200,
  justifyContent: 'center',
  alignContent: 'center',
  fontFamily: 'niramit-regular'
},
buttonText: {
  fontFamily: 'niramit-semibold',
  fontSize: 18,
  paddingBottom: 3,
},
textError: {
  fontFamily: 'niramit-semibold',
  fontSize: 18,
  alignSelf: 'center',
  marginLeft: 20,
  width: 200
}
});

export default EvaluacionAmigoMutation