import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { View, AsyncStorage, StyleSheet } from 'react-native';
import { Button, Text, ActivityIndicator, Colors } from 'react-native-paper';

const LOGIN_MUTATION = gql`
  mutation Login($access: String!, $password: String!) {
    login(access: $access, password: $password) {
      hash,
      tipo,
      idTipo,
      perfilConfigurado,
      configuracionPassword,
      usuario {
        nombres,
        apellidos,
        rut,
        fotoUrl,
        institucion{
          nombre
        }, 
        genero {
          id
        }
        alumno {
          orientacionSexual {
            id
          },
          puebloIndigena {
            id
          }
        }
      }
    }
  }  
`;

const LoginMutation = (props) => {

  const { user, goTo, setProfile } = props
  const [login, { data, loading: mutationLoading, error: mutationError }] = useMutation(
    LOGIN_MUTATION,
    {
      onCompleted({ login }) {
        AsyncStorage.setItem('token', login.hash);
        AsyncStorage.setItem('tipo', login.tipo);
        AsyncStorage.setItem('idtipo', String(login.idTipo))
        AsyncStorage.setItem('configurado', String(login.perfilConfigurado));
        AsyncStorage.setItem('nombres', login.usuario.nombres);
        AsyncStorage.setItem('apellidos', login.usuario.apellidos);
        AsyncStorage.setItem('rut', login.usuario.rut);
        AsyncStorage.setItem('foto', login.usuario.fotoUrl);
        AsyncStorage.setItem('institucion', login.usuario.institucion.nombre);
        AsyncStorage.setItem('configuracionPassword', String(login.configuracionPassword));
        AsyncStorage.setItem('generoId', String(login.usuario.genero.id));
        AsyncStorage.setItem('orientacionId', login.usuario.alumno?.orientacionSexual?.id);
        AsyncStorage.setItem('puebloIndigenaId', login.usuario.alumno?.puebloIndigena?.id);

        setProfile(login.usuario.fotoUrl);

        if (!login.configuracionPassword) {
          goTo('PasswordUpdate');
        } else {
          if(login.tipo == 'alumno'){
            if(!login.perfilConfigurado){
              goTo('ConfigStack')
            }else{
              goTo('AlumnoDrawer')
            }
          }else if(login.tipo == 'apoderado'){
            goTo('ApoderadoDrawer')
          }else{
            goTo('DocenteDrawer')
          }
        }
      }
    }
  );

  if (mutationLoading) return <ActivityIndicator animating={true} size="large" color="#B3FFFD" style={ styles.loading } />;

  if (mutationError){
    return (
      <View style={styles.view}>
        <Text style={styles.textError}> Datos Incorrectos </Text>
        <Button
          title="iniciarsesion"
          mode="contained"
          theme={{ roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} }}
          style= {styles.button}
          onPress={() => {
            login({ variables: { access: user.access, password: user.password } })
          }}
        >
          <Text style={ styles.buttonText }>Iniciar Sesión</Text>
        </Button>
      </View>
    );
  } 

  return (
    <View style={styles.view}>
      <Button
        title="iniciarsesion"
        mode="contained"
        theme={{ roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} }}
        style= {styles.button}
        onPress={() => {
          login({ variables: { access: user.access, password: user.password } })
        }}
      >
        <Text style={ styles.buttonText }>Iniciar Sesión</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    padding: 10, 
    width: '100%',
    alignItems: 'center',
  },
  button: {
    marginTop: 5,
    height: 50,
    width: 260,
    justifyContent: 'center',
    alignContent: 'center',
    fontFamily: 'niramit-regular'
  },
  buttonText: {
    fontFamily: 'nunito-black',
    fontSize: 20,
    paddingBottom: 3,
  },
  textError : {
    fontSize: 12,
    color: 'red',
    backgroundColor: '#fff',
    borderRadius: 25,
    width: '50%',
    textAlign: 'center'
  },
  loading: {
    marginTop: 14,
    marginBottom: 13,
  }
});

export default LoginMutation