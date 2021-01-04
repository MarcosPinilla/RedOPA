import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, AsyncStorage, Image } from 'react-native'
import { Text, Divider, Button, Avatar, TextInput} from 'react-native-paper'
import EvaluacionMutation from './EvaluacionMutation'

const EvaluacionSecundariaScreen = (props) => {

  let evaluacion = props.navigation.state.params.props.evaluacion
  let emocion = props.navigation.state.params.props.emocionId
  
  return (
    <View style={{ flex:1, margin: 25, alignItems: 'center', justifyContent:'center'}}>
      <Avatar.Text size={50} label="?" color="#B3FFFD"/>
      <Text style={{fontSize:25, marginBottom: 25}}>Lo que sientes es:</Text>
      <EvaluacionMutation message='Momentáneo' evaluacion= {evaluacion} emocion= {emocion} permanente={false} puede={true} navigation={props.navigation}/>
      <Button
      title="permanente"
      mode="contained"
      theme={{ roundness: 25, colors: { primary: '#57457F', text:'#FFFFFF'} }}
      style= {styles.button}
      onPress={()=> props.navigation.navigate('EvaluacionTerciaria', {props})}
    >
      <Text style={ styles.buttonText }>Permanente</Text>
      
    </Button>
    </View>
  )
  
  
}

const styles = StyleSheet.create({
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
});

export default EvaluacionSecundariaScreen;