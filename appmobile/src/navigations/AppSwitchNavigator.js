import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthStackNavigator from './AuthStackNavigator';
import ConfigStackNavigator from './ConfigStackNavigator';
import AlumnoDrawerNavigator from './AlumnoDrawerNavigator';
import ApoderadoDrawerNavigator from './ApoderadoDrawerNavigator';
import DocenteDrawerNavigator from './DocenteDrawerNavigator';
import UpdatePasswordStackNavigator from './UpdatePasswordStackNavigator';
import RecoverPasswordStackNavigator from './RecoverPasswordStackNavigator';
import CentroAsistenciaNavigator from './CentroAsistenciaNavigator';
import SignedOut from '../components/login/SignOut';


const AppSwitchNavigator = createSwitchNavigator({
  AuthStack: {
    screen: AuthStackNavigator,
  },
  AlumnoDrawer: {
    screen: AlumnoDrawerNavigator,
  },
  ApoderadoDrawer: {
    screen: ApoderadoDrawerNavigator,
  },
  DocenteDrawer: {
    screen: DocenteDrawerNavigator,
  },
  CentroAsistencia: {
    screen: CentroAsistenciaNavigator,
  },
  ConfigStack: {
    screen: ConfigStackNavigator,
  },
  PasswordUpdate: {
    screen: UpdatePasswordStackNavigator,
  },
  PasswordRecovery: {
    screen: RecoverPasswordStackNavigator,
  },
  SignedOut: {
    screen: SignedOut
  }
}, {
  initialRouteName: 'AuthStack',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#57457F',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'normal',
    },
  },
})

const AppContainer= createAppContainer(AppSwitchNavigator)

export default AppContainer