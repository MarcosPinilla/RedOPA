import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { View, AsyncStorage, StyleSheet, SafeAreaView, Dimensions, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { Button, Text, ActivityIndicator, Colors, Avatar, Divider } from 'react-native-paper';
import Moment from 'moment';
import 'moment/locale/es' 

import { dateFoto } from '../../../src/utils/date_foto';
import { LOGED } from '../../opagql/queries/loged_query';

const styles = StyleSheet.create({
  container: {
    borderRadius: 25, 
    backgroundColor: '#ffffff',
    flex:1,
    marginHorizontal: 20,
    marginTop: 50,
    padding: 0,
    alignItems: 'center',
    justifyContent:'center',
    marginBottom: 20,
  },
  avatarContainer: {
    marginTop: -40,
    marginBottom: 5,
  },
  avatarBack: {
    alignSelf: 'center',
    marginBottom: -115,
  },
  avatar: {
    marginTop: 10,
    alignSelf: 'center',
  },
  avatar2: {
    marginTop: -25,
    marginLeft: 100,
    alignSelf: 'center'
  },
  contenido: {
    margin: 10,
    padding: 20,
    flex: 12,
    alignContent: 'flex-start',
    textAlign: 'left',
    width: '100%'
  },
  elemento: {
    alignContent: 'flex-start',
    textAlign: 'left',
    marginLeft: 20,
    marginBottom: 10,
  },
  etiqueta: {
    fontFamily: 'source-sans-pro-regular',
    fontSize: 14,
    color: '#8D8197',
    marginLeft: -5,
    //flex: 3,
    alignSelf: 'flex-start',
    alignContent: 'flex-start',
    textAlign: 'left',
  },
  texto: {
    fontFamily: 'niramit-regular',
    fontSize: 18,
    color: '#57457F',
    //flex: 8,
    alignSelf: 'flex-start',
    alignContent: 'flex-start',
    textAlign: 'left',
  },
  divider: {
    height: 1,
    marginTop: 5,
    marginHorizontal: 0,
    backgroundColor: '#8D8197',
    marginLeft: -5,
  },
  buscarButton: {
    backgroundColor: '#57457F',
    borderRadius: 30,
    height: 50,
    marginBottom: 20,
    width: '60%',
    alignContent: 'center',
    alignSelf: 'center',
  },
  buscarText: {
    fontSize: 15,
    fontFamily: 'niramit-semibold',
    color: '#FFFFFF',
  },
});

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default function Perfil(props) {

  const { goTo, profile, setProfile } = props;

  const { data, loading, error, refetch} = useQuery(LOGED, { fetchPolicy: "network-only" });

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().then(() => {setRefreshing(false) })
  }, [refreshing]);


  if (loading) return <ActivityIndicator animating={true} color={Colors.purple600S} />;
  if (error) return <Text>ERROR</Text>;
  
  if(data != null) {
    let bi = dateFoto(profile.image);
    let bc = dateFoto(data.logueado.fotoUrl);

    if (bi < bc) {
      setProfile({ image: data.logueado.fotoUrl })
      AsyncStorage.setItem('foto', data.logueado.fotoUrl)
    }
  }

  function renderAlumno(){
    if(data.logueado.alumno != null){
      return(
        <Text style={{color:'#b5b5b5', fontSize:15, textAlign:'center', marginTop:3}}>Alumno</Text>
      ) 
    }
  }

  function renderApoderado(){
    if(data.logueado.apoderado != null){
      return(
        <Text style={{color:'#b5b5b5', fontSize:14, textAlign:'center', marginTop:3}}>Apoderado</Text>
      ) 
    }
  }

  function renderFuncionario(){
    if(data.logueado.funcionario != null){
      return(
        <Text style={{color:'#b5b5b5', fontSize:14, textAlign:'center', marginTop:3}}>Funcionario</Text>
      ) 
    }
  }

  Moment.locale('es');

  return (
    <SafeAreaView>
      <ScrollView  
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
          <View style={styles.container}>
            <View style={ styles.avatarContainer }>
              <Avatar.Image style= { styles.avatarBack } size={120} theme={{ colors: { primary: '#f0ffff' } }}/>
              <Avatar.Image style= { styles.avatar } size={90} theme={{ colors: { primary: '#e4ffff' } }} source={{uri: profile.image}} />
              <TouchableOpacity style= { styles.avatar2 } onPress={() => goTo('Configuraciones')}>
                <Avatar.Image  size={40} theme={{ colors: { primary: '#57457F' } }} source={require('../../../assets/camera.png')} />
              </TouchableOpacity>
              { renderAlumno() }
              { renderApoderado() }
              { renderFuncionario() }
            </View>
            <View style={styles.contenido}>
              <View style={styles.elemento}>
                <Text style={styles.etiqueta}>Nombres</Text>
                <Text style={styles.texto}>{data.logueado.nombres}</Text>
                <Divider style={styles.divider}></Divider>
              </View>
              <View style={styles.elemento}>
                <Text style={styles.etiqueta}>Apellidos</Text>
                <Text style={styles.texto}>{data.logueado.apellidos}</Text>
                <Divider style={styles.divider}></Divider>
              </View>
              <View style={styles.elemento}>
                <Text style={styles.etiqueta}>Rut</Text>
                <Text style={styles.texto}>{data.logueado.rut}</Text>
                <Divider style={styles.divider}></Divider>
              </View>
              <View style={styles.elemento}>
                <Text style={styles.etiqueta}>Correo</Text>
                <Text style={styles.texto}>{data.logueado.email}</Text>
                <Divider style={styles.divider}></Divider>
              </View>
              <View style={styles.elemento}>
                <Text style={styles.etiqueta}>Teléfono</Text>
                <Text style={styles.texto}>{data.logueado.telefono}</Text>
                <Divider style={styles.divider}></Divider>
              </View>
            </View>
            <Button
              onPress={() => goTo('Configuraciones')}
              mode='contained'
              style={ styles.buscarButton }>
              <Text style={ styles.buscarText }>Editar</Text>
            </Button>
          </View>
        </ScrollView>
    </SafeAreaView>
  );
}