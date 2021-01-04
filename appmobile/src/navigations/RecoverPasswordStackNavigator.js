import { createStackNavigator } from 'react-navigation';
import RecoverPasswordComponent from '../components/login/recover/RecoverPasswordComponent';
import EnviadoComponent from '../components/login/recover/EnviadoComponent';

const RecoverPasswordStackNavigator = createStackNavigator({
  RecoverPasswordScreen: {
    screen: RecoverPasswordComponent,
    navigationOptions: {
      headerTitle: 'Recuperación de contraseña',
    },
  },
  EnviadoScreen: {
    screen: EnviadoComponent,
    navigationOptions: {
      headerTitle: 'Correo enviado',
    },
  },
}, {
  initialRouteName: 'RecoverPasswordScreen',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#57457F',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'normal',
    },
  },
});

export default RecoverPasswordStackNavigator;