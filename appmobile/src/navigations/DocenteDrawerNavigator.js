import * as React from 'react'
import { createDrawerNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import SignedOut from '../components/login/SignOut'
import IconButton from 'react-native-paper'
import { Image } from 'react-native';
import CustomDrawerComponent from '../components/drawer/CustomDrawer'
import PublicacionesStack from './funcionario/PublicacionesFuncionarioStackNavigator'
import ConfiguracionStack from './ConfiguracionesStackNavigator'
import EvaluacionAlumnoStack from './funcionario/EvaluacionAlumnoStackNavigator'
import InformacionesStack from './InformacionesStackNavigator'

const DocenteDrawerNavigator = createDrawerNavigator({
  Publicaciones: {
    screen: PublicacionesStack,
    navigationOptions: {
      drawerIcon: ({tintColor}) => (
        <Image
          source={require('../../assets/newspaper-regular2x.png')}
          fadeDuration={0}
        />
      ),
      drawerLabel: 'Eventos', 
    }
  },
  EvaluaAlumnos: {
    screen: EvaluacionAlumnoStack ,
    navigationOptions: {
      drawerIcon: ({tintColor}) => (
        <Image
          source={require('../../assets/heart-regular2x.png')}
          fadeDuration={0}
        />
      ),
      drawerLabel: 'Evalúa a alumnos',
    }
  },
  Informaciones: {
    screen: InformacionesStack ,
    navigationOptions: {
      drawerIcon: ({tintColor}) => (
        <Image
          source={require('../../assets/question-circle-regular2x.png')}
          fadeDuration={0}
        />
      ),
      drawerLabel: 'Informaciones',
    }
  },
  Configuracion: {
    screen: ConfiguracionStack ,
    navigationOptions: {
      drawerIcon: ({tintColor}) => (
        <Image
          source={require('../../assets/settings-regular2x.png')}
          fadeDuration={0}
        />
      ),
      drawerLabel: 'Perfil y configuración',
    }
  }
  /*
  Evaluate: {
    screen: EvaluateStackNavigator,
    navigationOptions: {
      drawerIcon: ({tintColor}) => (
        <Icon name="md-briefcase" size={24} color={tintColor} />
      )
    }
  },
  Informaciones: {
    screen: InfoStackNavigator,
    navigationOptions: {
      drawerLabel: 'Informaciones',
      drawerIcon: ({tintColor}) => (
        <Icon name="md-cog" size={24} color={tintColor} />
      )
    },
  }*/
  
}, {
  contentComponent: CustomDrawerComponent,
  contentOptions: {
    activeTintColor: '#DD862F',
  }
})

export default DocenteDrawerNavigator