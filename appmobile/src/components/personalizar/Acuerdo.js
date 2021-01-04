import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Divider, Card, Paragraph, Button } from 'react-native-paper'
import { AsyncStorage } from 'react-native';

export default class Acuerdo extends Component {
  async getUser () {
    let user = await AsyncStorage.getItem('nombres');
    this.setState({user});
  }

  state = {
    acepto: false,
    user: ''
  }

  componentDidMount () {
    this.getUser();
  }

  render() {
    return (
      <View style= { styles.container }>
        <View style= { styles.title }>
          <Text style= { styles.hola }>Hola </Text>
          <Text style= { styles.nombre }>{this.state.user.split(' ')[0]}</Text>
        </View>
        
        <Card style= { styles.card }>
          <View style= { styles.titulo }>
            <Text style= { styles.bienvenido }>¡Bienvenid@ a OPA!</Text>
          </View>
          <Divider style= { styles.divider }/>
          <Card.Content>
            <Paragraph style= { styles.contenido }>
              Estamos muy contentos de tenerte aquí.
            </Paragraph>
            <Paragraph style= { styles.contenido }>
              Este es tu primer ingreso, por lo que necesitamos que realices
              los siguientes pasos, por favor.
            </Paragraph>
            <Paragraph style= { styles.contenido }>
              Nada del otro mundo, sólo necesitamos algunos datos para
              configurar tu cuenta.
            </Paragraph>
          </Card.Content>
        </Card>

        <View style= { styles.containerButtons }>
          <Button
            style={styles.button}
            onPress={ () => this.props.navigation.navigate("SignedOut") }
          >
            <Text style={ styles.buttonText }>Más tarde</Text>
          </Button>
          <Button
            style={styles.button}
            onPress={ () => this.props.navigation.navigate("ConfirmarCorreo") }
          >
            <Text style={ styles.buttonText }>Siguiente</Text>
          </Button>
        </View>
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
  title: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  hola: {
    fontSize: 22,
    fontFamily: 'niramit-regular',
    textAlignVertical: 'center',
  },
  nombre: {
    fontSize: 34,
    fontFamily: 'nunito-black',
  },
  card: {
    borderRadius: 10,
    flex: 6,
  },
  titulo: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bienvenido: {
    fontSize: 22,
    marginTop: 25,
    fontFamily: 'niramit-regular',
  },
  divider: {
    height: 3,
    marginTop: 20,
    marginHorizontal: 125,
    backgroundColor: '#57457F'
  },
  contenido: {
    fontSize: 16,
    marginHorizontal: 20,
    marginTop: 25,
    fontFamily: 'niramit-regular',
  },
  containerButtons: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'niramit-semibold',
  },
});