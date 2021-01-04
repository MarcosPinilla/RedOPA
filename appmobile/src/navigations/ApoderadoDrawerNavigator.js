import * as React from 'react'
import { createDrawerNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import { Image } from 'react-native';
import CustomDrawerComponent from '../components/drawer/CustomDrawer'
import PublicacionesStack from './apoderado/PublicacionesApoderadoStackNavigator'
import ConfiguracionStack from './ConfiguracionesStackNavigator'
import EvaluacionPupiloStack from './apoderado/EvaluacionPupiloStackNavigator'
import HistorialStack from './apoderado/HistorialEvaluacionStackNavigator';
import InformacionesStack from './InformacionesStackNavigator'

const ApoderadoDrawerNavigator = createDrawerNavigator({
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
  EvaluacionPupilo: {
    screen: EvaluacionPupiloStack ,
    navigationOptions: {
      drawerIcon: ({tintColor}) => (
        <Image
          source={require('../../assets/heart-regular2x.png')}
          fadeDuration={0}
        />
      ),
      drawerLabel: 'Evaluación pupilo',
    }
  },
  Historial: {
    screen: HistorialStack ,
    navigationOptions: {
      drawerIcon: ({tintColor}) => (
        <Image
          source={require('../../assets/emoticon-happy2x.png')}
          fadeDuration={0}
        />
      ),
      drawerLabel: 'Historial de evaluaciones',
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
  },*/  
}, {
  contentComponent: CustomDrawerComponent,
  contentOptions: {
    activeTintColor: '#DD862F',
  }
})

export default ApoderadoDrawerNavigator