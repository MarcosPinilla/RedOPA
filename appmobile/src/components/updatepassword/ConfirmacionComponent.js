import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Card, Button } from 'react-native-paper'
import { AsyncStorage } from 'react-native';

class ConfirmacionComponent extends Component {
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
        <View style={ styles.titleContainer}>
          <Text style= { styles.title }>Contraseña <Text style={ styles.cambiada }>cambiada</Text></Text>
        </View>
        
        <Card style={ styles.card }>
          <View style={ styles.subtitleContainer }>
            <Text style={ styles.subtitle }>Ahora puedes iniciar sesión con tu nueva contraseña.</Text>
          </View>

          <Card.Content>
            <Button onPress={ () => this.props.navigation.navigate('SignedOut') } mode='contained' style={ styles.continuarButton }>
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
  cambiada: {
    fontSize: 22,
    fontFamily: 'niramit-bold',
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

export default ConfirmacionComponent;