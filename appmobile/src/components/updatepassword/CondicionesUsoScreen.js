import React, { Component } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Text, Divider, Card, Paragraph, Button } from 'react-native-paper'
import { AsyncStorage } from 'react-native';
import ConsentimientoMutation from './ConsentimientoMutation'

export default class Acuerdo extends Component {
  async getUser () {
    let user = await AsyncStorage.getItem('nombres');
    this.setState({user});
    this.goTo = this.goTo.bind(this);
  }

  state = {
    acepto: false,
    user: ''
  }

  goTo = (path) => {
    this.props.navigation.navigate(path)
  }

  componentDidMount () {
    this.getUser();
  }

  render() {
    return (
      <ScrollView style={{backgroundColor:'#F6F6F6'}}>
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
                  Te cuento que Red OPA está diseñada para cuidar tu salud 
                  mental. Por lo tanto, toda la información que aquí ingreses 
                  será completamente confidencial, y sólo compartida en caso 
                  de emergencia al equipo de convivencia escolar.
                </Paragraph>
                <Paragraph style= { styles.contenido }>
                  Si tienes dudas, escríbenos a <Text style={styles.bold}>contacto@opa.cl.</Text>
                </Paragraph>
                <Paragraph style= { styles.contenido }>
                  Si estás de acuerdo en participar, presiona <Text style={styles.bold}>"Confirmar".</Text>
                </Paragraph>
            </Card.Content>
          </Card>
          <View style={{flexDirection:'column', justifyContent:'flex-end'}}>
            <View style= { styles.containerButtons }>
              <Button
                style={styles.button}
                onPress={ () => this.props.navigation.navigate("SignedOut") }
              >
                <Text style={ styles.buttonText }>Más tarde</Text>
              </Button>
              <ConsentimientoMutation goTo={this.goTo}/>
            </View>
          </View>          
        </View>
      </ScrollView>
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
  bold: {
    fontSize: 16,
    marginHorizontal: 20,
    marginTop: 25,
    fontFamily: 'niramit-bold',
  },
  containerButtons: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    
  },
  button: {
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'niramit-semibold',
  },
});