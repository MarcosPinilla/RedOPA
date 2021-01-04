import React from 'react'
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'
import {TouchableOpacity} from 'react-native'
import { Text } from 'react-native-paper';
import EvaluacionAlumnoComponent from '../../components/funcionario/evaluacionalumno/EvaluacionAlumnoComponent';
import EvaluadoScreen from '../../components/funcionario/evaluacionalumno/EvaluadoScreen';
import EvaluacionAlumnoCompleta from '../../components/funcionario/evaluacionalumno/EvaluacionAlumnoCompleta'

const EvaluacionAlumnoStack = createStackNavigator({
  EvaluacionAlumno: {
    screen: EvaluacionAlumnoComponent,
    navigationOptions: {
      headerTitle: 'Evaluación Alumno',
      headerRight: null
    },
  },
  EvaluadoScreen: {
      screen: EvaluadoScreen,
      navigationOptions: {
          headerTitle: 'Evalúa a tu Alumno'
      }
  },
  EvaluacionAlumnoCompleta: {
    screen: EvaluacionAlumnoCompleta,
    navigationOptions:{
      headerRight: null,
      headerLeft: (
        <Icon style={{ paddingLeft: 15 }} name="md-menu" color="white" size={30} />
      ),
      headerTitle: 'Evaluación Completa'
    }
  }
}, {
    initialRouteName: 'EvaluacionAlumno',
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

export default EvaluacionAlumnoStack;