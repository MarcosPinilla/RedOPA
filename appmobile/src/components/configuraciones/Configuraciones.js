import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Button, Text, FAB } from 'react-native-paper';
import { Linking } from 'expo';

export default class Configuraciones extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  seguirEnlace = (enlace) => {
    Linking.openURL(enlace);
  }
  
  render() {
    return (
      <View>
        <ScrollView>
          <View style={{ flex: 1, backgroundColor: '#F6F6F6' }}>
          <View style={{alignItems:'stretch'}}>
            <View style={{marginHorizontal: 25, marginVertical:15, borderRadius: 25, backgroundColor: '#fff', paddingBottom: 25}}>
              <View style={styles.head}>
                <Text style={styles.name}>Mi Correo y Número</Text>
              </View>
              <View style={styles.body}>
                <Button style={styles.button}
                  title="ievaluar"
                  mode="contained"
                  theme={{ roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} }}
                  style= {styles.button}
                  onPress={() => {this.seguirEnlace('http://opa.cl/cambioconfiguracion')}}
                  ><Text style={styles.buttonText}>Solicitar Cambio</Text>
                </Button>
              </View>
            </View>
            <View style={{marginHorizontal: 25, marginVertical:15, borderRadius: 25, backgroundColor: '#fff', paddingBottom: 25}}>
              <View style={styles.head}>
                <Text style={styles.name}>Mi Foto y Alias</Text>
              </View>
              <View style={styles.body}>
                <Button style={styles.button}
                  title="ievaluar"
                  mode="contained"
                  theme={{ roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} }}
                  style= {styles.button}
                  onPress={() => this.props.navigation.navigate('Foto')}
                  ><Text style={ styles.buttonText }>Editar</Text>
                </Button>
              </View>
            </View>
            <View style={{marginHorizontal: 25, marginVertical:15, borderRadius: 25, backgroundColor: '#fff', paddingBottom: 25}}>
              <View style={styles.head}>
                <Text style={styles.name}>Mis Amigos</Text>
              </View>
              <View style={styles.body}>
                <Button style={styles.button}
                  title="ievaluar"
                  mode="contained"
                  theme={{ roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} }}
                  style= {styles.button}
                  onPress={() => this.props.navigation.navigate('Amigos')}
                  ><Text style={ styles.buttonText }>Editar</Text>
                </Button>
              </View>
            </View>
            <View style={{marginHorizontal: 25, marginVertical:15, borderRadius: 25, backgroundColor: '#fff', paddingBottom: 25}}>
              <View style={styles.head}>
                <Text style={styles.name}>Mis Funcionarios</Text>
              </View>
              <View style={styles.body}>
                <Button style={styles.button}
                  title="ievaluar"
                  mode="contained"
                  theme={{ roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} }}
                  style= {styles.button}
                  onPress={() => this.props.navigation.navigate('Funcionarios')}
                  ><Text style={ styles.buttonText }>Editar</Text>
                </Button>
              </View>
            </View>
            <View style={{marginHorizontal: 25, marginVertical:15, borderRadius: 25, backgroundColor: '#fff', paddingBottom: 25}}>
              <View style={styles.head}>
                <Text style={styles.name}>Mis Contactos</Text>
                <Text style={styles.name}>Externos</Text>
              </View>
              <View style={styles.body}>
                <Button style={styles.button}
                  title="ievaluar"
                  mode="contained"
                  theme={{ roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} }}
                  style= {styles.button}
                  onPress={() => this.props.navigation.navigate('ContactosExternos')}
                  ><Text style={ styles.buttonText }>Editar</Text>
                </Button>
              </View>
            </View>
            <View style={{marginHorizontal: 25, marginVertical:15, borderRadius: 25, backgroundColor: '#fff', paddingBottom: 25}}>
              <View style={styles.head}>
                <Text style={styles.name}>Mis Intereses</Text>
              </View>
              <View style={styles.body}>
                <Button style={styles.button}
                  title="ievaluar"
                  mode="contained"
                  theme={{ roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} }}
                  style= {styles.button}
                  onPress={() => this.props.navigation.navigate('InteresesAlumno')}
                  ><Text style={ styles.buttonText }>Editar</Text>
                </Button>
              </View>
            </View>
            <View style={{marginHorizontal: 25, marginVertical:15, borderRadius: 25, backgroundColor: '#fff', paddingBottom: 25}}>
              <View style={styles.head}>
                <Text style={styles.name}>Grupo de</Text>
                <Text style={styles.name}>Identificación</Text>
              </View>
              <View style={styles.body}>
                <Button style={styles.button}
                  title="ievaluar"
                  mode="contained"
                  theme={{ roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} }}
                  style= {styles.button}
                  onPress={() => this.props.navigation.navigate('PuebloIndigena')}
                  ><Text style={ styles.buttonText }>Editar</Text>
                </Button>
              </View>
            </View>
            <View style={{marginHorizontal: 25, marginVertical:15, borderRadius: 25, backgroundColor: '#fff', paddingBottom: 25}}>
              <View style={styles.head}>
                <Text style={styles.name}>Identidad de</Text>
                <Text style={styles.name}>Género</Text>
              </View>
              <View style={styles.body}>
                <Button style={styles.button}
                  title="ievaluar"
                  mode="contained"
                  theme={{ roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} }}
                  style= {styles.button}
                  onPress={() => this.props.navigation.navigate('IdentidadGenero', {
                    configs: true
                  })}
                  ><Text style={ styles.buttonText }>Editar</Text>
                </Button>
              </View>
            </View>
            <View style={{marginHorizontal: 25, marginVertical:15, borderRadius: 25, backgroundColor: '#fff', paddingBottom: 25}}>
              <View style={styles.head}>
                <Text style={styles.name}>Orientación Sexual</Text>
              </View>
              <View style={styles.body}>
                <Button style={styles.button}
                  title="ievaluar"
                  mode="contained"
                  theme={{ roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} }}
                  style= {styles.button}
                  onPress={() => this.props.navigation.navigate('OrientacionSexual', {
                    configs: true
                  })}
                  ><Text style={ styles.buttonText }>Editar</Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
        </ScrollView>
        
        <FAB
          style={styles.fab}
          icon={({ size, color }) => (
            <Avatar.Image style={ styles.avatar } size={42} theme={{ colors: { primary: '#b3fffd' } }} source={require('../../../assets/SOS.png')} />
          )}
          onPress={() => this.props.navigation.navigate("CentroAsistencia")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cargando: {
    marginTop: 50
  },
  button: {
    overflow: 'hidden',
    height: 50,
    width: 180,
    justifyContent: 'center',
    alignContent: 'center',
    fontFamily: 'niramit-semibold',
    borderColor: '#57457F'
  },
  button1: {
    height: 50,
    width: 10,
    justifyContent: 'center',
    alignContent: 'center',
    fontFamily: 'niramit-semibold',
    borderColor: '#57457F'
  },
  buttonText: {
    fontFamily: 'niramit-semibold',
    fontSize: 18
  },
  head:{
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 10
  },
  head1:{
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 25,
    marginBottom: 10
  },
  avatar:{
    
  },
  name: {
    marginHorizontal: 15,
    fontSize: 28,
    color: '#57457F',
    fontFamily: 'niramit-regular',
    textAlign: 'center'
  },
  name1: {
    marginHorizontal: 10,
    fontSize: 28,
    color: '#57457F',
    fontFamily: 'niramit-regular'
  },
  body:{
    flexDirection:'row',
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'center',
    alignContent: 'center'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    padding: 0,
    alignContent: 'center',
    alignSelf: 'center',
  },
  avatar: {
    alignSelf: 'center',
    alignContent: 'center',
    marginTop: -8
  },
});
