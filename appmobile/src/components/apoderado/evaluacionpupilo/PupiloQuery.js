import React from 'react';
import gql from 'graphql-tag';
import { View, StyleSheet } from 'react-native'
import { Divider, Avatar, List, ActivityIndicator, Button, Text, Image} from 'react-native-paper';
import { useQuery } from '@apollo/react-hooks';

const GET_PUPILOS = gql`
  query {
    pupilosQuery {
      id,
      alias,
      cuenta{
        id,  
        nombres,
        apellidos,
        rut,
        fotoUrl
      }
    }
  }
`

function PupiloQuery  (props) {
  const { goTo } = props;
  const { data, loading, error, refetch } = useQuery(GET_PUPILOS);

  console.log(data);
  
  if (loading) return <ActivityIndicator animating={true} color="#57457F" size="large" style={ styles.cargando } />;

  return (
    <View style={{alignItems:'stretch'}}>
      {data.pupilosQuery &&
        data.pupilosQuery.map(pupilo => (
        <View key={pupilo.id}>
          <View style={styles.head}>
            <Avatar.Image size={200} source={{uri: pupilo.cuenta.fotoUrl}} style={styles.avatar}/>
            <Text style={styles.name}>{pupilo.cuenta.nombres}</Text>
            <Text style={styles.name}>{pupilo.cuenta.apellidos}</Text>
          </View>
          <View style={styles.body}>
            <Button style={styles.button}
              title="ievaluar"
              mode="contained"
              theme={{ roundness: 25, colors: { primary: '#FFF', text:'#57457F'} }}
              style= {styles.button}
              onPress={() => {goTo('EvaluadoScreen', {alumno: pupilo})}}><Text style={ styles.buttonText }>Evaluar</Text>
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
    flexDirection: 'column',
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
    fontSize: 28,
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

export default PupiloQuery;