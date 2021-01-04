import React from 'react'
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'
import InformacionesComponent from '../components/informaciones/InformacionesComponent';
import InformacionScreen from '../components/informaciones/InformacionScreen';
import MejorarAnimoScreen from '../components/informaciones/MejorarAnimoScreen';
import AyudarAmigoScreen from '../components/informaciones/AyudarAmigoScreen';
import ContactosAyudaScreen from '../components/informaciones/ContactosAyudaScreen';
import SenalesAlertaScreen from '../components/informaciones/SenalesAlertaScreen';
import MitosRealidadesScreen from '../components/informaciones/MitosRealidadesScreen';
import EnlacesInteresScreen from '../components/informaciones/EnlacesInteresScreen';
import {TouchableOpacity} from 'react-native'
import { Text } from 'react-native-paper';

const InformacionesStack = createStackNavigator({
  Informaciones: {
    screen: InformacionesComponent,
    navigationOptions: {
      headerTitle: 'Informaciones',
      headerRight: null
    },
  },
  InformacionScreen: {
    screen: InformacionScreen,
    navigationOptions: {
      headerTitle: 'Informaciones',
    },
  },
  MejorarAnimoScreen: {
    screen: MejorarAnimoScreen,
    navigationOptions: {
      headerTitle: 'Informaciones',
    },
  },
  AyudarAmigoScreen: {
    screen: AyudarAmigoScreen,
    navigationOptions: {
      headerTitle: 'Informaciones',
    },
  },
  ContactosAyudaScreen: {
    screen: ContactosAyudaScreen,
    navigationOptions: {
      headerTitle: 'Informaciones',
    },
  },
  SenalesAlertaScreen: {
    screen: SenalesAlertaScreen,
    navigationOptions: {
      headerTitle: 'Informaciones',
    },
  },
  MitosRealidadesScreen: {
    screen: MitosRealidadesScreen,
    navigationOptions: {
      headerTitle: 'Informaciones',
    },
  },
  EnlacesInteresScreen: {
    screen: EnlacesInteresScreen,
    navigationOptions: {
      headerTitle: 'Informaciones',
    },
  },
}, {
    initialRouteName: 'Informaciones',
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
          fontWeight: 'normal',
        },
      };
      
    },
});

export default InformacionesStack;
