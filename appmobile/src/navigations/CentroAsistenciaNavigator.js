import React from 'react';
import CentroAsistenciaComponent from '../components/CentroAsistencia/CentroAsistenciaComponent';
import SOSScreen from '../components/CentroAsistencia/SOSScreen';
import PuedeEsperarScreen from '../components/CentroAsistencia/PuedeEsperarScreen';
import SaludRespondeScreen from '../components/CentroAsistencia/SaludRespondeScreen';
import ConvivenciaScreen from '../components/CentroAsistencia/ConvivenciaScreen';
import AmigoPeligroScreen from '../components/CentroAsistencia/AmigoPeligroScreen';
import AmbulanciaScreen from '../components/CentroAsistencia/AmbulanciaScreen';
import {TouchableOpacity} from 'react-native'
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons'
import { createStackNavigator } from 'react-navigation';

const CentroAsistenciaNavigator = createStackNavigator({
  CentroAsistencia: {
    screen: CentroAsistenciaComponent,
    navigationOptions: {
      headerRight: null
    }
  },
  SOSScreen: {
    screen: SOSScreen,
  },
  PuedeEsperarScreen: {
    screen: PuedeEsperarScreen,
  },
  SaludRespondeScreen: {
    screen: SaludRespondeScreen,
  },
  ConvivenciaScreen: {
    screen: ConvivenciaScreen,
  },
  AmigoPeligroScreen: {
    screen: AmigoPeligroScreen
  },
  AmbulanciaScreen: {
    screen: AmbulanciaScreen,
  },
}, {
  initialRouteName: 'CentroAsistencia',
  defaultNavigationOptions: ({ navigation }) =>{
    return {
      headerStyle: {
        backgroundColor: '#57457F',
        shadowOpacity: 0,
        shadowOffset: {
          height: 0,
        },
        shadowRadius: 0,
        elevation: 0,
      },
      headerRight: (
        <TouchableOpacity style={{ paddingRight: 15 }} onPress={() => navigation.goBack()}>
          <Text style={{fontSize: 20, color:'#fff'}}>Atrás</Text>
        </TouchableOpacity>
      ),
      headerLeft: null,
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    };
  },
});

export default CentroAsistenciaNavigator;