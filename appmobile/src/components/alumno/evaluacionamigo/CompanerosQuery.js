import React from 'react';
import gql from 'graphql-tag';
import { View, StyleSheet } from 'react-native'
import { Divider, Avatar, List, ActivityIndicator, Button, Text } from 'react-native-paper';
import { useQuery } from '@apollo/react-hooks';

const GET_COMPANEROS = gql`
  query {
    noAmigosCurso {
      id,
      alias,
      cuenta{
        id,
        nombres,
        apellidos,
        fotoUrl
      }
    }
  }
`

function CompanerosQuery  (props) {
  
  const { goTo, nombre } = props;
  const { data, loading, error, refetch } = useQuery(GET_COMPANEROS);

  const filtro = (alumno) => {
    if (nombre !== null && nombre !== ''){
      let reg = new RegExp('^' + nombre);
      if (alumno.cuenta.nombres.match(reg) || alumno.cuenta.apellidos.match(reg)) {
        return true
      }
      return false;
    } else {
      return true;
    }
  }

  if (loading) return <ActivityIndicator animating={true} color="#57457F" size="large" style={ styles.cargando } />;

  return (
    <View style={{alignItems:'stretch'}}>
      {data.noAmigosCurso &&
        data.noAmigosCurso.filter(filtro).map(alumno => (
        <View key={alumno.id}>
          <View style={styles.head}>
            <Avatar.Image size={55} source={{uri: alumno.cuenta.fotoUrl}} style={styles.avatar}/>
            <Text style={styles.name}>{alumno.cuenta.nombres.split(' ')[0] + ' ' + alumno.cuenta.apellidos.split(' ')[0]}</Text>
          </View>
          <View style={styles.body}>
            <Button style={styles.button}
              title="ievaluar"
              mode="contained"
              theme={{ roundness: 25, colors: { primary: '#FFF', text:'#57457F'} }}
              style= {styles.button}
              onPress={() => {goTo('EvaluadoScreen', {alumno: alumno})}}><Text style={ styles.buttonText }>Evaluar</Text>
            </Button>
          </View>
        </View>
      ))}  
    </View>
  )
}

const styles = StyleSheet.create({
  cargando: {
    marginTop: 50
  },
  input: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    height: 50,
    width: 180,
    justifyContent: 'center',
    alignContent: 'center',
    fontFamily: 'niramit-semibold',
    borderColor: '#57457F',
    marginBottom: 10,
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
  }
});

export default CompanerosQuery;