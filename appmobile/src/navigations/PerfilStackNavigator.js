import React from 'react'
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'
import PerfilScreen from '../components/perfil/PerfilComponent'
import ConfiguracionStack from './ConfiguracionStackNavigator'

const PerfilStackNavigator = createStackNavigator({
  Perfil: {
    screen: PerfilScreen,
    navigationOptions: {
      headerTitle: 'Mi Perfil',
      headerRight: null
    },
  },
  Configuracion: {
    screen: ConfiguracionStack ,
    navigationOptions: {
      headerTitle: 'Configuración',
    }
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
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      };
      
    },
});

//export default PerfilStackNavigator;
