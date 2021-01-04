import { createStackNavigator } from 'react-navigation';
import LoginComponent from '../components/login/LoginComponent';
import Enviado from '../components/login/Enviado';
import SignOut from '../components/login/SignOut';
import AuthLoadingScreen from '../components/login/AuthLoadingScreen';

const AuthStackNavigator = createStackNavigator({
  LoginScreen: {
    screen: LoginComponent,
    navigationOptions: {
      header: null,
    },
  },
  EnviadoScreen: {
    screen: Enviado,
    navigationOptions: {
      //headerTitle: '',
    },
  },
  AuthLoading: {
    screen: AuthLoadingScreen,
    navigationOptions:{
      header:null
    }
  },
  /*SignOutScreen: {
    screen: SignOut,
    navigationOptions: {
      headerTitle: 'Cerrar sesión',
    },
  },*/
}, {
  initialRouteName: 'AuthLoading',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#57457F',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

export default AuthStackNavigator;