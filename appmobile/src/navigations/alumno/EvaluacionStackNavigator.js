import React from 'react'
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'
import {TouchableOpacity} from 'react-native'
import EvaluacionScreen from '../../components/alumno/evaluacion/EvaluacionComponent'
import EvaluacionSecundaria from '../../components/alumno/evaluacion/EvaluacionSecundariaScreen'
import EvaluacionTerciaria from '../../components/alumno/evaluacion/EvaluacionTerciariaScreen'
import EvaluacionTerciariaScreen from '../../components/alumno/evaluacion/EvaluacionTerciariaScreen';
import { Text } from 'react-native-paper';
import EvaluacionCompletaScreen from '../../components/alumno/evaluacion/EvaluacionCompletaScreen';

const EvaluacionStackNavigator = createStackNavigator({
  Evaluacion: {
    screen: EvaluacionScreen,
    navigationOptions: {
      headerTitle: 'Evaluación Diaria',
      headerRight: null
    },
  },
  EvaluacionSecundaria: {
    screen: EvaluacionSecundaria,
    navigationOptions: {
      headerTitle: 'Evaluación Diaria',
    },
  },
  EvaluacionTerciaria: {
    screen: EvaluacionTerciariaScreen,
    navigationOptions: {
      headerTitle: 'Evaluación Diaria',
    },
  },
  EvaluacionCompleta: {
    screen: EvaluacionCompletaScreen,
    navigationOptions: {
      headerTitle: 'Evaluación Completada',
      headerRight: null,
      headerLeft: (
        <Icon style={{ paddingLeft: 15 }} name="md-menu" color="white" size={30} />
      )
    }
  }
}, {
    initialRouteName: 'Evaluacion',
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

export default EvaluacionStackNavigator;
