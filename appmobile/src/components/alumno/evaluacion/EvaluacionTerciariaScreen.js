import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, AsyncStorage, Image } from 'react-native'
import { Text, Divider, Button, Avatar, TextInput} from 'react-native-paper'
import EvaluacionMutation from './EvaluacionMutation'

const EvaluacionTerciariaScreen = (props) => {

  let evaluacion = props.navigation.state.params.props.navigation.state.params.props.evaluacion
  let emocion = props.navigation.state.params.props.navigation.state.params.props.emocionId

  function goTo (path)  {
    props.navigation.navigate(path)
  }

  return (
    <View style={{ flex:1, margin: 25, alignItems: 'center', justifyContent:'center'}}>
      <Text style={{fontSize:25, marginBottom: 25}}>¿Crees que puedes con esto?</Text>
      <EvaluacionMutation message='Sí' evaluacion= {evaluacion} emocion= {emocion} permanente={true} puede={true} goTo={goTo} navigation={props.navigation}/>
      <EvaluacionMutation message='No' evaluacion= {evaluacion} emocion= {emocion} permanente={true} puede={false} goTo={goTo} navigation={props.navigation}/>
    </View>
  )
}

export default EvaluacionTerciariaScreen;