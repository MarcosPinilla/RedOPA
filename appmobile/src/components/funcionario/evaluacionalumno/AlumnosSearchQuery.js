import React from 'react';
import gql from 'graphql-tag';
import { View, StyleSheet } from 'react-native'
import { Avatar, List, ActivityIndicator, Button, Text } from 'react-native-paper';
import { graphql } from 'react-apollo';
import { FlatList } from 'react-native';

const AlumnosSearchQuery = (props) => {
  const AlumosQ = graphql(
    gql`
        query searchAlumno($textSearch: String, $institucion_id: ID, $course_id: ID) {
            searchAlumno(textSearch: $textSearch, institucion_id: $institucion_id, course_id: $course_id) {
            id,
            cuenta {
                id,
                rut,
                nombres,
                apellidos,
                estado,
                telefono,
                email,
                institucion{
                nombre
                }
            },
            curso {
                id,
                nivel,
                letra
            }
        }
    }
    `, {
      options: {
        notifyOnNetworkStatusChange: true,
        errorPolicy: "all",
        fetchPolicy: 'network-only',
        variables: { textSearch: props.textSearch }
      }
    }
  )((data) => Alumnos(data, props));

  return (
    <AlumosQ/>
  );
}

function Alumnos({ data }, props) {
  const { goTo } = props; 


  if (data.networkStatus == 1) {
    return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" />
        </View>
    );
  }

  if (data.error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorMessage}>Ha ocurrido un error,</Text>
        <Text style={styles.errorMessage}>Por favor intente otra vez</Text>        
        <Button style={{margin: 40}}  mode="outlined" onPress={() => data.refetch()}>
          Reintentar
        </Button>
      </View>
    );
  }

  return (
    (data?.searchAlumno) 
    ? (data.searchAlumno.length > 0)
      ? <FlatList
        data={data.searchAlumno}
        keyExtractor={(item, index) => index.toString()}
        refreshing={data.networkStatus === 4}
        onRefresh={() => data.refetch()}
        renderItem={({item}) => rItem({item, goTo})}
      /> 
      : <View style={styles.centerContainer}>
        <Text style={styles.errorMessage}>No se encontraron registros</Text>
      </View>
    : <View style={styles.centerContainer}>
      <ActivityIndicator size="large" />
    </View>
  )
}


function rItem({item, goTo}) {
  return (
    <View>
      <List.Item key={item.id} style={ styles.item } titleStyle={styles.name}
        title={item.cuenta.nombres.split(' ')[0] + ' ' + item.cuenta.apellidos.split(' ')[0]}
        left={() => <Avatar.Image size={50} source={{uri: item.cuenta.fotoUrl}} />}
        onPress={() => {goTo('EvaluadoScreen', {alumno: item})}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cargando: {
    marginTop: 50
  },
 
  button: {
    height: 50,
    width: 180,
    justifyContent: 'center',
    alignContent: 'center',
    fontFamily: 'niramit-semibold',
    borderColor: '#57457F'
  },
  buttonText: {
    fontFamily: 'niramit-semibold',
    fontSize: 18,
    paddingBottom: 3,
  },
  head:{
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 10
  },
  avatar:{
    
  },
  name: {
    marginHorizontal: 15,
    fontSize: 20,
    color: '#57457F',
    fontFamily: 'niramit-regular'
  },
  body:{
    flexDirection:'row',
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'center',
    alignContent: 'center'
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorMessage: {
    fontSize: 15,
    fontFamily: 'niramit-semibold',
    color: '#57457F'
  }
});

export default AlumnosSearchQuery;