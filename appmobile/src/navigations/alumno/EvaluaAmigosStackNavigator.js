import React from 'react'
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'
import {TouchableOpacity} from 'react-native'
import { Text } from 'react-native-paper';
import EvaluacionComponent from '../../components/alumno/evaluacionamigo/EvaluacionComponent';
import EvaluadoScreen from '../../components/alumno/evaluacionamigo/EvaluadoScreen';
import EvaluacionAmigoCompleta from '../../components/alumno/evaluacionamigo/EvaluacionAmigoCompleta'

const EvaluaAmigosStackNavigator = createStackNavigator({
  EvaluaAmigo: {
    screen: EvaluacionComponent,
    navigationOptions: {
      headerTitle: 'Evaluación Amigo',
      headerRight: null
    },
  },
  EvaluadoScreen: {
      screen: EvaluadoScreen,
      navigationOptions: {
          headerTitle: 'Evalúa a tu Amigo'
      }
  },
  EvaluacionAmigoCompleta: {
    screen: EvaluacionAmigoCompleta,
    navigationOptions:{
      headerRight: null,
      headerLeft: (
        <Icon style={{ paddingLeft: 15 }} name="md-menu" color="white" size={30} />
      ),
      headerTitle: 'Evaluación Completa'
    }
  }
}, {
    initialRouteName: 'EvaluaAmigo',
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

export default EvaluaAmigosStackNavigator;