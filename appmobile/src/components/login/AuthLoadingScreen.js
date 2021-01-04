import React from 'react';
import { AsyncStorage, View, ImageBackground, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { connect } from 'react-redux';
import * as actions from '../../rdx/actions';

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this.verifyToken();
  }

  verifyToken = async () => {
    const userToken = await AsyncStorage.getItem('token');
    const userTipo = await AsyncStorage.getItem('tipo');
    const userConfigurado = await AsyncStorage.getItem('configurado');
    const configuracionPassword = await AsyncStorage.getItem('configuracionPassword');
    
    if(userToken){
      const userImage = await AsyncStorage.getItem('foto');
      this.props.setProfile({ image: userImage });

      if (configuracionPassword === 'true') {
        if(userTipo == 'alumno') {
          if(userConfigurado === 'false'){
            this.props.navigation.navigate('ConfigStack')
          }else{
            this.props.navigation.navigate('AlumnoDrawer')
          }
        }else if(userTipo == 'apoderado'){
          this.props.navigation.navigate('ApoderadoDrawer')
        }else if(userTipo == 'funcionario'){
          this.props.navigation.navigate('DocenteDrawer')
        }else{
          this.props.navigation.navigate('AlumnoDrawer')
        }
      } else {
        this.props.navigation.navigate('PasswordUpdate');
      }
    }else{
      this.props.navigation.navigate('LoginScreen')
    }

    //this.props.navigation.navigate(userToken ? 'AlumnoDrawer' : 'LoginScreen');
    //
  };

  render() {
    return (
      <View >
        <ImageBackground source={require('../../../assets/loginBackgroundNew.png')} style={{width: '100%', height: '100%'}}> 
          <View style={styles.container}>
            <ActivityIndicator size={100} color="#FFFFFF"/>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
    marginTop: 200,
  }
});

export default connect(null, actions)(AuthLoadingScreen);
