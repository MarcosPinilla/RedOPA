import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { View, AsyncStorage, StyleSheet } from 'react-native';
import { Button, Text, ActivityIndicator, Colors } from 'react-native-paper';
import { onError } from 'apollo-link-error';

const CREATE_EVALUACION_MUTATION = gql`
  mutation CreateEvaluacion($emocionId: ID!, $alumnoId: ID!, $permanente: Boolean!, $puede: Boolean!) {
    createEvaluacion(emocionId: $emocionId, alumnoId: $alumnoId, permanente: $permanente, puede: $puede) {
      fecha,
      nivel
    }
  }  
`;

const EvaluacionMutation = (props) => {

  const { evaluacion, message, emocion, permanente, puede, goTo, navigation } = props
  const [createEvaluacion, { data, loading: mutationLoading, error: mutationError }] = useMutation(
    CREATE_EVALUACION_MUTATION,
    {
      onCompleted({ createEvaluacion}) {
        if(emocion === 1 || emocion === 2 || emocion === 3 || emocion === 4){
          navigation.navigate('Evaluacion', {props})
        }else{
          navigation.navigate('EvaluacionCompleta', {props})
        }
      }
    }
  );

  if (mutationLoading) return <ActivityIndicator animating={true} color='#57457F' />;
  if (mutationError){
    if(emocion === 1 || emocion === 2 || emocion === 3 || emociona === 4){
      return(
        <View style={{flexDirection: 'column'}}>
          <Button
            title="evaluacion"
            mode="contained"
            theme={{ roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} }}
            style= {styles.button}
            onPress={() => {
              navigation.navigate('Evaluacion', {props})
            }}
          >
            <Text style={ styles.buttonText }>Salir</Text>
            
          </Button>
    
          <Text style={styles.textError}>Upss, ya te evaluaste</Text>
        </View>
        
      );
    }else{
      return(
        <View style={{flexDirection: 'column'}}>
          <Button
            title="evaluacion"
            mode="contained"
            theme={{ roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} }}
            style= {styles.button}
            onPress={() => {
              navigation.navigate('EvaluacionCompleta', {props})
            }}
          >
            <Text style={ styles.buttonText }>Salir</Text>
            
          </Button>
    
          <Text style={styles.textError}>Upss, ya te evaluaste</Text>
        </View>
        
      );
    }
  } 
    
  
  return (
      <Button
        title="evaluacion"
        mode="contained"
        theme={{ roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} }}
        style= {styles.button}
        onPress={() => {
          createEvaluacion({ variables: { emocionId: emocion, alumnoId: evaluacion.alumnoId, permanente: permanente, puede: puede } })
        }}
      >
        <Text style={ styles.buttonText }>{message}</Text>
        
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
    width: 260,
    justifyContent: 'center',
    alignContent: 'center',
    fontFamily: 'niramit-regular'
  },
  buttonText: {
    fontFamily: 'niramit-semibold',
    fontSize: 20,
    paddingBottom: 3,
  },
  textError: {
    fontFamily: 'niramit-semibold',
    fontSize: 18,
    alignSelf: 'center',
  }
});

export default EvaluacionMutation