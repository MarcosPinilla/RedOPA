import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Card, Button } from 'react-native-paper'

class EnviadoComponent extends Component {
  state = {
    acepto: false,
    user: ''
  }

  render() {
    return (
      <View style= { styles.container }>
        <View style={ styles.titleContainer}>
          <Text style= { styles.title }>Correo enviado</Text>
        </View>
        
        <Card style={ styles.card }>
          <View style={ styles.subtitleContainer }>
            <Text style={ styles.subtitle }>Revisa tu correo para obtener tu contraseña autogenerada, la cual deberás <Text style={ styles.cambiar }>cambiar</Text> al iniciar sesión.</Text>
          </View>

          <Card.Content>
            <Button onPress={ () => this.props.navigation.navigate('AuthStack') } mode='contained' style={ styles.continuarButton }>
              <Text style={ styles.continuarText }>Continuar</Text>
            </Button>
          </Card.Content>
        </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F6F6F6',
  },
  titleContainer: {
    justifyContent: 'center',
    marginHorizontal: 50,
  },
  title: {
    fontSize: 22,
    fontFamily: 'niramit-regular',
    textAlign: 'center',
  },
  card: {
    borderRadius: 10,
    flex: 6, 
    paddingTop: 25,
    marginTop: 10,
    paddingHorizontal: 5,
  },
  subtitleContainer: {
    justifyContent: 'center',
    marginHorizontal: 30,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'niramit-regular',
  },
  cambiar: {
    fontSize: 16,
    fontFamily: 'niramit-bold',
  },
  continuarButton: {
    borderRadius: 25,
    backgroundColor: '#B3FFFD',
    height: 50,
    marginHorizontal: 30,
  },
  continuarText: {
    fontFamily: 'nunito-bold',
    fontSize: 22,
    paddingBottom: 3,
  },
});

export default EnviadoComponent;