import React from 'react'
import {TouchableOpacity} from 'react-native'
import { Text } from 'react-native-paper';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'
import PerfilScreen from '../components/perfil/PerfilComponent'
import Configuraciones from '../components/configuraciones/ConfiguracionesAll'
import Foto from '../components/configuraciones/foto/FotoComponent'
import Correo from '../components/configuraciones/correo/CorreoComponent'

const ConfiguracionStackNavigator = createStackNavigator({
  Configuraciones: {
    screen: Configuraciones,
    navigationOptions: {
      headerTitle: 'Configuración',
    },
  },
  Foto: {
    screen: Foto,
    navigationOptions: {
      headerTitle: 'Foto y Alias',
    },
  },
  Correo: {
    screen: Correo,
    navigationOptions: {
      headerTitle: 'Correo y Número',
    },
  },
  Perfil: {
    screen: PerfilScreen,
    navigationOptions: {
      headerTitle: 'Mi Perfil',
      headerRight: null
    },
  },
}, {
  initialRouteName: 'Perfil',
  defaultNavigationOptions: ({ navigation }) =>{
    return {
      headerStyle: {
        backgroundColor: '#57457F',
      },
      headerLeft: (
        <Icon style={{ paddingLeft: 15 }} onPress={() => navigation.openDrawer()} name="md-menu" color="white" size={30} />
      ),
      headerRight: (
        <TouchableOpacity style={{ paddingRight: 15 }} onPress={() => navigation.goBack()}>
          <Text style={{fontSize: 20, color:'#fff'}}>Atrás</Text>
        </TouchableOpacity>
      ),
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  },
});

export default ConfiguracionStackNavigator;
