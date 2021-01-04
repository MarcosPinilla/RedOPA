import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Divider, Card, Paragraph } from 'react-native-paper'
import { AsyncStorage } from 'react-native';
import ConfirmacionMutation from './ConfirmacionMutation';

export default class Confirmacion extends Component {
  async getUser () {
    let user = await AsyncStorage.getItem('nombres');
    this.setState({user});
  }

  state = {
    confirmo: false,
    user: ''
  }

  componentDidMount () {
    this.getUser();
  }

  goTo = (path) => {
    this.props.navigation.navigate(path)
  }

  render() {
    return (
      <View style= { styles.container }>
        <View style={ styles.titleContainer}>
          <Text style= { styles.nombre }>{this.state.user.split(' ')[0]}</Text>
        </View>

        <Card style= { styles.card }>
          <View style= { styles.subtitleContainer }>
            <Text style= { styles.gracias }>¡Gracias!</Text>
          </View>
          <Divider style= { styles.divider }/>
          <Card.Content>
            <Paragraph style= { styles.contenido }>
              Muchas gracias por tu tiempo.
            </Paragraph>
            <Paragraph style= { styles.contenido }>
              Has completado satisfactoriamente tu perfil.
            </Paragraph>
            <Paragraph style= { styles.contenido }>
              Ahora podrás disfrutar de OPA.
            </Paragraph>
            <Paragraph style= { styles.contenido }>
              ¡Te estamos esperando!
            </Paragraph>
          </Card.Content>
        </Card>

        <View style= { styles.containerButtons }>
          <ConfirmacionMutation goTo={this.goTo}/>
        </View>
      </View>
    );
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
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  nombre: {
    fontSize: 34,
    fontFamily: 'nunito-black',
  },
  card: {
    borderRadius: 10,
    flex: 6, 
    paddingTop: 25,
    marginTop: 10,
    paddingHorizontal: 5,
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  gracias: {
    fontSize: 22,
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
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'niramit-semibold',
  },
});