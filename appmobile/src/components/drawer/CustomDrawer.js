import React, {Component} from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Platform, AsyncStorage, TouchableOpacity } from 'react-native'
import { Avatar, Button } from 'react-native-paper';
import { DrawerItems } from 'react-navigation'
import Constants from 'expo-constants';

import { connect } from 'react-redux';

function statusBar() {
  if (Platform.OS === 'android') {
    return (
      <View style={styles.statusBar} />
    )
  }
}
class CustomDrawerComponent extends Component {
  _isMounted = false;

  constructor(props) {
    super(props)

    this.state = {
      tipo: '',
      nombres: '',
      apellidos: '',
      rut: '',
      foto: 'https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder.jpg',
      institucion: ''
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.getUser()
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  async getUser() {
    let tipo = await AsyncStorage.getItem('tipo')
    let nombres = await AsyncStorage.getItem('nombres');
    let apellidos = await AsyncStorage.getItem('apellidos');
    let rut = await AsyncStorage.getItem('rut');
    let institucion = await AsyncStorage.getItem('institucion');
    if(this._isMounted){
      this.setState({tipo})
      this.setState({nombres})
      this.setState({apellidos})
      this.setState({rut})
      this.setState({institucion})
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {statusBar()}
        <View style={styles.profile}>         
          <View>
            <View style={styles.avatarContainer}>
              <TouchableOpacity onPress={ () => this.props.navigation.navigate("Configuracion")} >
                <Avatar.Image style={ styles.avatarBack} size={200} theme={{ colors: { primary: 'rgba(255, 255, 255, 0)' } }} source={require('../../../assets/drawericon.png')} />
                <Avatar.Image style= { styles.avatar } size={70} source={{uri: this.props.profile.image }} />
              </TouchableOpacity>
              <Text numberOfLines={2} style={{fontSize: 22, marginTop: 80, marginLeft: -40, fontFamily: 'nunito-black', color: '#57457F'}}>{this.state.nombres.split(' ')[0]}{'\n'}{this.state.apellidos.split(' ')[0]}</Text>
            </View>
          </View>
        </View>
        <ScrollView>
          <DrawerItems {...this.props} />
        </ScrollView>
        <View>
          <Button 
            icon="exit-to-app"
            mode="contained"
            style= {styles.button}
            theme={{ colors: { primary: '#fff' } }}
            onPress={ () => this.props.navigation.navigate("SignedOut") }>
            Cerrar Sesión
          </Button>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  profile: { 
    alignItems: 'center', 
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: '#B3FFFD'
  },
  avatarContainer: {
    marginLeft: -60,
    padding: 5,
    flexDirection: 'row',
    alignItems:'center',
    marginRight: 0,
    marginBottom: 20,
    marginTop: -70,
  },
  avatarBack: {
    alignSelf: 'center',
    //marginBottom: -115,
  },
  avatar: {
    //marginTop: 10,
    alignSelf: 'center',
    marginTop: -140,
    marginLeft: -12,
    borderColor: '#fff',
    borderWidth: 3,
    borderStyle:'solid',
    overflow: 'hidden',
  },
  outline: {
    //marginTop: 10,
    alignSelf: 'center',
    marginTop: -140,
    marginLeft: -12,
  },
  image: {
    height:100, 
    width:100, 
    borderRadius: 60,
  },
  statusBar: {
    backgroundColor: "#57457F",
    height: Constants.statusBarHeight,
  },
  button: {
    marginTop: 15,
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
  }
})

const mapStateToProps = state => {
  return { profile: state.profile };
}

export default connect(mapStateToProps, null)(CustomDrawerComponent);