import React from 'react'
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'
import PublicacionesScreen from '../../components/publicaciones/AllPublicacionesScreen'

const PublicacionesFuncionarioStackNavigator = createStackNavigator({
  Publicaciones: {
    screen: PublicacionesScreen,
    navigationOptions: {
      headerTitle: 'Eventos',
    },
  },
}, {
    initialRouteName: 'Publicaciones',
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

export default PublicacionesFuncionarioStackNavigator;
