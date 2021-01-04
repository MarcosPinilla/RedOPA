import React from 'react'
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'
import {TouchableOpacity} from 'react-native'
import { Text } from 'react-native-paper';
import HistorialComponent from '../../components/apoderado/historialevaluacion/HistorialComponent';

const HistorialStack = createStackNavigator({
  HistorialScreen: {
    screen: HistorialComponent,
    navigationOptions: {
      headerTitle: 'Historial',
      headerRight: null
    },
  }
}, {
    initialRouteName: 'HistorialScreen',
    defaultNavigationOptions: ({ navigation }) =>{
      return {
        headerStyle: {
          backgroundColor: '#57457F',
        },
        headerLeft: (
          <Icon style={{ paddingLeft: 15 }} onPress={() => navigation.openDrawer()} name="md-menu" color="white" size={30} />
        ),
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'normal',
        },
      };
      
    },
});

export default HistorialStack;