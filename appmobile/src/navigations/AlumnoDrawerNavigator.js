import * as React from 'react'
import { createDrawerNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import CustomDrawerComponent from '../components/drawer/CustomDrawer'
import PublicacionesStack from './alumno/PublicacionesStackNavigator'
import ConfiguracionStack from './ConfiguracionStackNavigator'
import EvaluacionStack from './alumno/EvaluacionStackNavigator'
import { Image } from 'react-native';
import EvaluaAmigosStackNavigator from './alumno/EvaluaAmigosStackNavigator'
import InformacionesStack from './InformacionesStackNavigator'
//import PerfilStack from './PerfilStackNavigator';

const AlumnoDrawerNavigator = createDrawerNavigator({
  Publicaciones: {
    screen: PublicacionesStack ,
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
  Evaluacion: {
    screen: EvaluacionStack ,
    navigationOptions: {
      drawerIcon: ({tintColor}) => (
        <Image
          source={require('../../assets/heart-regular2x.png')}
          fadeDuration={0}
        />
      ),
      drawerLabel: 'Evaluación Diaria',
    }
  },
  EvaluaAmigos: {
    screen: EvaluaAmigosStackNavigator ,
    navigationOptions: {
      drawerIcon: ({tintColor}) => (
        <Image
          source={require('../../assets/user-friends-solid2x.png')}
          fadeDuration={0}
        />
      ),
      drawerLabel: 'Evalua a tus Amigos',
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
  },
  /*CentroAsistencia: {
    screen: CentroAsistenciaNavigator,
    drawerIcon: ({tintColor}) => (
      <Image
        source={require('../../assets/settings-regular2x.png')}
        fadeDuration={0}
      />
    ),
    drawerLabel: 'Centro de asistencia',
  },*/
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
    activeTintColor: '#584A64',
  },
})

export default AlumnoDrawerNavigator