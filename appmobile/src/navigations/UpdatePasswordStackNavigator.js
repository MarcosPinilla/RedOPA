import { createStackNavigator } from 'react-navigation';
import UpdatePasswordComponent from '../components/updatepassword/UpdatePasswordComponent';
import ConfirmacionComponent from '../components/updatepassword/ConfirmacionComponent';
import CondicionesUsoScreen from '../components/updatepassword/CondicionesUsoScreen';

const UpdatePasswordStackNavigator = createStackNavigator({
  CondicionesUso: {
    screen: CondicionesUsoScreen,
    navigationOptions: {
      headerTitle: 'Condiciones de uso',
    },
  },
  UpdatePasswordScreen: {
    screen: UpdatePasswordComponent,
    navigationOptions: {
      headerTitle: 'Cambio de contraseña',
    },
  },
  ConfirmacionScreen: {
    screen: ConfirmacionComponent,
    navigationOptions: {
      headerTitle: 'Actualización exitosa',
    },
  },
}, {
  initialRouteName: 'CondicionesUso',
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

export default UpdatePasswordStackNavigator;