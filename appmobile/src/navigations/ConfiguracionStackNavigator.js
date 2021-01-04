import React from 'react'
import {TouchableOpacity} from 'react-native'
import { Text } from 'react-native-paper';
import {createStackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'
import PerfilScreen from '../components/perfil/PerfilComponent'
import Configuraciones from '../components/configuraciones/Configuraciones'
import Amigos from '../components/configuraciones/amigos/AmigosComponent'
import Funcionarios from '../components/configuraciones/contactos/ContactosComponent'
import ContactosExternos from '../components/configuraciones/contactosexternos/ContactosExternosComponent'
import InteresesAlumno from '../components/configuraciones/interesesalumno/InteresesAlumnoComponent'
import Foto from '../components/configuraciones/fotoalumno/FotoComponent'
import Correo from '../components/configuraciones/correo/CorreoComponent'
import PuebloIndigena from '../components/configuraciones/puebloindigena/PuebloIndigenaComponent';
import IdentidadGenero from '../components/configuraciones/identidadgenero/IdentidadGeneroComponent';
import OrientacionSexual from '../components/configuraciones/orientacionsexual/OrientacionSexualComponent';

const ConfiguracionStackNavigator = createStackNavigator({
  Perfil: {
    screen: PerfilScreen,
    navigationOptions: {
      headerTitle: 'Mi Perfil',
      headerRight: null,

    },
  },
  Configuraciones: {
    screen: Configuraciones,
    navigationOptions: {
      headerTitle: 'Configuración',
    },
  },
  Amigos:{
    screen: Amigos,
    navigationOptions: {
      headerTitle: 'Amigos',
    },
  },
  Funcionarios: {
    screen: Funcionarios,
    navigationOptions: {
      headerTitle: 'Funcionarios de confianza',
    },
  },
  ContactosExternos: {
    screen: ContactosExternos,
    navigationOptions: {
      headerTitle: 'Contactos externos',
    },
  },
  InteresesAlumno: {
    screen: InteresesAlumno,
    navigationOptions: {
      headerTitle: 'Intereses personales',
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
      headerTitle: 'Correo y número',
    },
  },
  PuebloIndigena: {
    screen: PuebloIndigena,
    navigationOptions: {
      headerTitle: 'Grupo de identificación',
    },
  },
  IdentidadGenero: {
    screen: IdentidadGenero,
    navigationOptions: {
      headerTitle: 'Identidad de género',
    },
  },
  OrientacionSexual: {
    screen: OrientacionSexual,
    navigationOptions: {
      headerTitle: 'Orientación sexual',
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
