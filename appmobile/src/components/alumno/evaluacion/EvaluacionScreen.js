import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, AsyncStorage, Image, RefreshControl, ScrollView, SafeAreaView } from 'react-native'
import { Text, Divider, Button, Avatar, TextInput} from 'react-native-paper'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_EVALUACIONES_HECHAS = gql`
  query {
    autoevaluacionesDia
  }
`;

function EvaluacionScreen (props) {
  const { data, loading, error, refetch} = useQuery(GET_EVALUACIONES_HECHAS);

  const { goTo, handleChange, goBack, evaluacion } = props;

  const [refreshing, setRefreshing] = React.useState(false);

  let evaluacionesHechasQuery = <Text style={styles.texto}>Cargando...</Text>;
  if (loading) evaluacionesHechasQuery = <Text style={styles.texto}>Cargando...</Text>;
  if (error) evaluacionesHechasQuery = <Text style={styles.texto}>Error del servidor</Text>;
  if (data) {
    if (data.autoevaluacionesDia > 0) {
      if (data.autoevaluacionesDia === 1) {
        evaluacionesHechasQuery = (
          <View alignItems= 'center'>
              <Text style={{fontSize:30, color:'orange'}}>AVISO</Text>
              <Text style={styles.texto}>Ya hiciste tu evaluación diaria, pero puedes volver a evaluarte cuantas veces quieras</Text>
          </View>
          )
      } else {
        evaluacionesHechasQuery = (
          <View alignItems= 'center'>
            <Text style={{fontSize:30, color:'orange'}}>AVISO</Text>
          <Text style={styles.texto}>Hoy te has evaluado {data.autoevaluacionesDia} veces</Text>
          </View>
          );
      }
    } else {
      evaluacionesHechasQuery = <Text style={styles.texto}>Aún no te has evaluado hoy</Text>
    }
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().then(() => setRefreshing(false));
  }, [refreshing]);

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>
          <Text style={{fontSize:25, marginBottom: 5, fontFamily: 'niramit-bold', color: '#57457F'}}>¿Cómo te sientes hoy?</Text>
          { evaluacionesHechasQuery }
          <View style={{flexDirection:'row', flexWrap: 'nowrap'}}>
            <View style={{flexDirection:'column',alignItems: 'center'}}>
              <TouchableOpacity onPress={()=> goTo('EvaluacionCompleta', {evaluacion, emocionId: 1, goTo})} style={{flexDirection:'column',alignItems: 'center'}}>
                <Image source={require('../../../../assets/emotes/emoji_happy.gif')} style={{width:100,height:100, margin:5}}></Image>
                <Text style={{ fontFamily: 'niramit-regular', fontSize: 20}}>Feliz</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection:'column',alignItems: 'center'}}>
              <TouchableOpacity onPress={()=> goTo('EvaluacionCompleta', {evaluacion, emocionId: 2})} style={{flexDirection:'column',alignItems: 'center'}}>
                <Image source={require('../../../../assets/emotes/emoji_cool.gif')} style={{width:100,height:100, margin:5}}></Image>
                <Text style={{ fontFamily: 'niramit-regular', fontSize: 20}}>Piola</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection:'row', flexWrap: 'nowrap'}}>
            <View style={{flexDirection:'column',alignItems: 'center'}}>
              <TouchableOpacity onPress={()=> goTo('EvaluacionCompleta', {evaluacion, emocionId: 3})} style={{flexDirection:'column',alignItems: 'center'}}>
                <Image source={require('../../../../assets/emotes/emoji_indecisive.gif')} style={{width:100,height:100, margin:5}}></Image>
                <Text style={{ fontFamily: 'niramit-regular', fontSize: 20}}>Indecis@</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection:'column',alignItems: 'center'}}>
              <TouchableOpacity onPress={()=> goTo('EvaluacionCompleta', {evaluacion, emocionId: 4})} style={{flexDirection:'column',alignItems: 'center'}}>
                <Image source={require('../../../../assets/emotes/emoji_indifferent.gif')} style={{width:100,height:100, margin:5}}></Image>
                <Text style={{ fontFamily: 'niramit-regular', fontSize: 20}}>Indiferente</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection:'row', flexWrap: 'nowrap'}}>
            <View style={{flexDirection:'column',alignItems: 'center'}}>
              <TouchableOpacity onPress={()=> goTo('EvaluacionSecundaria', {evaluacion, emocionId: 5})} style={{flexDirection:'column',alignItems: 'center'}}>
                <Image source={require('../../../../assets/emotes/emoji_angry.gif')} style={{width:100,height:100, margin:5}}></Image>
                <Text style={{ fontFamily: 'niramit-regular', fontSize: 20}}>Enojad@</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection:'column',alignItems: 'center'}}>
              <TouchableOpacity onPress={()=> goTo('EvaluacionSecundaria', {evaluacion, emocionId: 6})} style={{flexDirection:'column',alignItems: 'center'}}>
                <Image source={require('../../../../assets/emotes/emoji_troubled.gif')} style={{width:100,height:100, margin:5}}></Image>
                <Text style={{ fontFamily: 'niramit-regular', fontSize: 20}}>Cansad@</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection:'row', flexWrap: 'nowrap'}}>
            <View style={{flexDirection:'column',alignItems: 'center'}}>
              <TouchableOpacity onPress={()=> goTo('EvaluacionSecundaria', {evaluacion, emocionId: 7})} style={{flexDirection:'column',alignItems: 'center'}}>
                <Image source={require('../../../../assets/emotes/emoji_sad.gif')} style={{width:100,height:100, margin:5}}></Image>
                <Text style={{ fontFamily: 'niramit-regular', fontSize: 20}}>Triste</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25, 
    backgroundColor: '#ffffff',
    flex:1,
    margin: 25,
    alignItems: 'center',
    justifyContent:'center',
  },
  texto: {
    color:'#b5b5b5',
    fontSize:14,
    textAlign:'center',
    marginTop: 0,
    marginBottom: 15,
    paddingHorizontal: 5,
  }
});

export default EvaluacionScreen;
