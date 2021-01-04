import React, { Component } from 'react'
import { Text, Button } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'

export default class Enviado extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Hemos enviado un correo electrónico con las
          instrucciones para recuperar su contraseña
        </Text>
        <Button
          title="enviado"
          mode="contained"
          onPress={ () => this.props.navigation.navigate("LoginScreen")}
        >
          Entendido
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  text: {
    fontSize: 30,
    textAlign: 'justify'
  }
})