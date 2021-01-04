import React from 'react';
import gql from 'graphql-tag';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import { Divider, Avatar, List, ActivityIndicator, Button, Text, Image} from 'react-native-paper';
import { useQuery } from '@apollo/react-hooks';
import EmojiElement from './EmojiElement';
import Moment from 'moment';
import 'moment/locale/es' 

const GET_HISTORIAL = gql`
  query {
    historialApoderado {
      id,
      fecha,
      nivel,
      emocion{
        id,  
        nombre,
        descripcion
      }
    }
  }
`

function HistorialQuery  (props) {
  const { goTo } = props;
  const { data, loading, error, refetch } = useQuery(GET_HISTORIAL);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().then(() => setRefreshing(false));
  }, [refreshing]);

  if (loading) return <ActivityIndicator animating={true} color="#57457F" size="large" style={ styles.cargando } />;

  Moment.locale('es');

  return (
    <ScrollView
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <Text style={styles.titleText}>Tu Historial</Text>
      <View style={styles.container}>
      <View style={{alignItems:'stretch'}}>
        {data.historialApoderado &&
          data.historialApoderado.map(evaluacion => (
          <View key={evaluacion.id}>
            <View style={styles.head}>
              <View style={styles.body}>
                <EmojiElement emocionId={evaluacion.emocion.id} />
                <View style={{flexDirection: "column"}}>
                  <Text style={styles.name}>{evaluacion.emocion.nombre}</Text>
                  <Text style={styles.fecha}>{Moment(evaluacion.fecha).format('DD-MM-YYYY')} a las {Moment(evaluacion.fecha).format('H:mm')}</Text>
                </View>
              </View>
            </View>
            <Divider style={{marginHorizontal: 15}}></Divider>
          </View>
        ))}  
      </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 25,
    borderRadius: 25, 
    backgroundColor: '#ffffff',
    paddingBottom: 25
  },
  titleText : {
    fontFamily: 'niramit-regular',
    color: '#57457F',
    fontSize: 25,
    alignSelf: 'center',
    marginTop: 25
  },
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
    alignItems: 'stretch',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 10
  },
  avatar:{
    
  },
  name: {
    marginHorizontal: 15,
    fontSize: 22,
    color: '#57457F',
    fontFamily: 'niramit-regular'
  },
  fecha: {
    marginHorizontal: 15,
    fontSize: 18,
    color: '#57457F',
    fontFamily: 'niramit-regular'
  },
  body:{
    flexDirection:'row',
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center'
  }
});

export default HistorialQuery;