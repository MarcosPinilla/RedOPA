import React from 'react'
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'
import {TouchableOpacity} from 'react-native'
import { Text } from 'react-native-paper';
import EvaluacionPupiloComponent from '../../components/apoderado/evaluacionpupilo/EvaluacionPupiloComponent';
import EvaluacionPupiloCompleta from '../../components/apoderado/evaluacionpupilo/EvaluacionPupiloCompleta';
import EvaluadoScreen from '../../components/apoderado/evaluacionpupilo/EvaluadoScreen';

const EvaluacionPupiloStack = createStackNavigator({
  EvaluacionPupilo: {
    screen: EvaluacionPupiloComponent,
    navigationOptions: {
      headerTitle: 'Evalúa  tu Pupilo',
      headerRight: null
    },
  },
  EvaluadoScreen: {
      screen: EvaluadoScreen,
      navigationOptions: {
          headerTitle: 'Evalúa a tu Pupilo'
      }
  },
  EvaluacionPupiloCompleta: {
    screen: EvaluacionPupiloCompleta,
    navigationOptions:{
      headerRight: null,
      headerLeft: (
        <Icon style={{ paddingLeft: 15 }} name="md-menu" color="white" size={30} />
      ),
      headerTitle: 'Evaluación Completada'
    }
  }
}, {
    initialRouteName: 'EvaluacionPupilo',
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

export default EvaluacionPupiloStack;