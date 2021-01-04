import { createStackNavigator } from 'react-navigation';
import Correo from '../components/personalizar/correo/CorreoComponent';
//import Minoria from '../components/personalizar/minoria/MinoriaComponent';
import Foto from '../components/personalizar/foto/FotoComponent';
import Acuerdo from '../components/personalizar/Acuerdo';
import Amigos from '../components/personalizar/amigos/AmigosComponent';
import Funcionarios from '../components/personalizar/contactos/ContactosComponent';
import ContactosExternos from '../components/personalizar/contactosexternos/ContactosExternosComponent';
import InteresesAlumno from '../components/personalizar/interesesalumno/InteresesAlumnoComponent';
import Confirmacion from '../components/personalizar/confirmacion/ConfirmacionComponent';
import PuebloIndigena from '../components/personalizar/puebloindigena/PuebloIndigenaComponent';
import IdentidadGenero from '../components/personalizar/identidadgenero/IdentidadGeneroComponent';
import OrientacionSexual from '../components/personalizar/orientacionsexual/OrientacionSexualComponent';

const ConfigStackNavigator = createStackNavigator({
  AcuerdoScreen: {
    screen: Acuerdo,
    navigationOptions: {
      headerTitle: 'Bienvenida',
    },
  },
  ConfirmarCorreo: {
    screen: Correo,
    navigationOptions: {
      headerTitle: 'Personaliza tu perfil',
    },
  },
  /*PersonalizarMinoria: {
    screen: Minoria,
    navigationOptions: {
      headerTitle: 'Personaliza tu perfil',
    },
  },*/
  PersonalizarPuebloIndigena: {
    screen: PuebloIndigena,
    navigationOptions: {
      headerTitle: 'Personaliza tu perfil'
    },
  },
  PersonalizarIdentidadGenero: {
    screen: IdentidadGenero,
    navigationOptions: {
      headerTitle: 'Personaliza tu perfil'
    },
  },
  PersonalizarOrientacionSexual: {
    screen: OrientacionSexual,
    navigationOptions: {
      headerTitle: 'Personaliza tu perfil'
    },
  },
  PersonalizarFoto: {
    screen: Foto,
    navigationOptions: {
      headerTitle: 'Personaliza tu perfil',
    },
  },
  PersonalizarAmigos: {
    screen: Amigos,
    navigationOptions: {
      headerTitle: 'Amigos',
    },
  },
  PersonalizarFuncionarios: {
    screen: Funcionarios,
    navigationOptions: {
      headerTitle: 'Funcionarios de confianza',
    },
  },
  PersonalizarContactosExternos: {
    screen: ContactosExternos,
    navigationOptions: {
      headerTitle: 'Contactos externos',
    },
  },
  PersonalizarInteresesAlumno: {
    screen: InteresesAlumno,
    navigationOptions: {
      headerTitle: 'Intereses personales',
    },
  },
  ConfirmarPersonalizacion: {
    screen: Confirmacion,
    navigationOptions: {
      headerTitle: 'Perfil completado',
    },
  },
}, {
    initialRouteName: 'AcuerdoScreen',
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

export default ConfigStackNavigator;