import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, AsyncStorage, Image } from 'react-native'
import { Text, Divider, Button, Avatar, TextInput} from 'react-native-paper'
import EvaluacionMutation from './EvaluacionMutation'
import FitImage from 'react-native-fit-image'

const EvaluacionCompletaScreen = (props) => {

  let evaluacion = props.navigation.state.params.props.evaluacion 
  let emocion = props.navigation.state.params.props.emocionId
  let emocionNegative = props.navigation.state.params.props.emocion
  
  if( emocion === 1 ){
    return(
      <View style={{flex: 1 , backgroundColor: "#F6F6F6", width: '100%'}}>
         <View style={{ flex:2, margin: 25,  backgroundColor:'#FFFFFF', borderRadius: 25, alignItems:'center'}}>
          <Text style={{fontSize:30, marginBottom: 25, marginTop:10}}>Muchas Gracias por Evaluarte!!!</Text>
          <Image source={require('../../../../assets/emotes/emoji_happy.gif')} style={{width:100,height:100, margin:5}}></Image>
          <Text style={{fontSize:25, marginBottom: 25}}>Te sientes Feliz</Text>
          <Image source={require('../../../../assets/informaciones/21.png')} style={styles.image}></Image>
          <EvaluacionMutation message='Confirmar' evaluacion= {evaluacion} emocion= {emocion} permanente={false} puede={false} navigation={props.navigation}/>
        </View>
      </View>
    )
  }else if( emocion === 2){
    return(
      <View style={{flex: 1 , backgroundColor: "#F6F6F6", width: '100%'}}>
         <View style={{ flex:2, margin: 25,  backgroundColor:'#FFFFFF', borderRadius: 25, alignItems:'center', flexDirection:'column'}}>
          <Text style={{fontSize:30, marginBottom: 25, marginTop:10}}>Muchas Gracias por Evaluarte!!!</Text>
          <Image source={require('../../../../assets/emotes/emoji_cool.gif')} style={{width:100,height:100, margin:5}}></Image>
          <Text style={{fontSize:25, marginBottom: 25}}>Te sientes Piola</Text>
          <Image source={require('../../../../assets/informaciones/22.png')} style={styles.image}></Image>
          <EvaluacionMutation message='Confirmar' evaluacion= {evaluacion} emocion= {emocion} permanente={false} puede={false} navigation={props.navigation}/>
        </View>
      </View>
    )
  }else if( emocion === 3){
    return(
      <View style={{flex: 1 , backgroundColor: "#F6F6F6", width: '100%'}}>
         <View style={{ flex:2, margin: 25,  backgroundColor:'#FFFFFF', borderRadius: 25, alignItems:'center', flexDirection:'column'}}>
          <Text style={{fontSize:30, marginBottom: 25, marginTop:10}}>Muchas Gracias por Evaluarte!!!</Text>
          <Image source={require('../../../../assets/emotes/emoji_indecisive.gif')} style={{width:100,height:100, margin:5}}></Image>
          <Text style={{fontSize:25, marginBottom: 25}}>Te sientes Indecis@</Text>
          <Image source={require('../../../../assets/informaciones/23.png')} style={styles.image}></Image>
          <EvaluacionMutation message='Confirmar' evaluacion= {evaluacion} emocion= {emocion} permanente={false} puede={false} navigation={props.navigation}/>
        </View>
      </View>
    )
  }else if( emocion === 4){
    return(
      <View style={{flex: 1 , backgroundColor: "#F6F6F6", width: '100%'}}>
         <View style={{ flex:2, margin: 25,  backgroundColor:'#FFFFFF', borderRadius: 25, alignItems:'center', flexDirection:'column'}}>
          <Text style={{fontSize:30, marginBottom: 25, marginTop:10}}>Muchas Gracias por Evaluarte!!!</Text>
          <Image source={require('../../../../assets/emotes/emoji_indifferent.gif')} style={{width:100,height:100, margin:5}}></Image>
          <Text style={{fontSize:25, marginBottom: 25}}>Te sientes Indiferente</Text>
          <Image source={require('../../../../assets/informaciones/24.png')} style={styles.image}></Image>
          <EvaluacionMutation message='Confirmar' evaluacion= {evaluacion} emocion= {emocion} permanente={false} puede={false} navigation={props.navigation}/>
        </View>
      </View>
    )
  }else if( emocionNegative === 5){
    return(
      <View style={{flex: 1 , backgroundColor: "#F6F6F6", width: '100%'}}>
         <View style={{ flex:2, margin: 25,  backgroundColor:'#FFFFFF', borderRadius: 25, alignItems:'center', flexDirection:'column'}}>
          <Text style={{fontSize:30, marginBottom: 25, marginTop:10}}>Muchas Gracias por Evaluarte!!!</Text>
          <Image source={require('../../../../assets/emotes/emoji_angry.gif')} style={{width:100,height:100, margin:5}}></Image>
          <Text style={{fontSize:25, marginBottom: 25}}>Te sientes Enojad@</Text>
          <Image source={require('../../../../assets/informaciones/25.png')} style={styles.image}></Image>
          <Button
            title="salir"
            mode="contained"
            theme={{ roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} }}
            style= {styles.button}
            onPress={() => {
              props.navigation.navigate('Evaluacion')
            }}
          >
            <Text style={ styles.buttonText }>Confirmar</Text>
          
          </Button>
        </View>
      </View>
    )
  }else if( emocionNegative === 6){
    return(
      <View style={{flex: 1 , backgroundColor: "#F6F6F6", width: '100%'}}>
         <View style={{ flex:2, margin: 25,  backgroundColor:'#FFFFFF', borderRadius: 25, alignItems:'center', flexDirection:'column'}}>
          <Text style={{fontSize:30, marginBottom: 25, marginTop:10}}>Muchas Gracias por Evaluarte!!!</Text>
          <Image source={require('../../../../assets/emotes/emoji_troubled.gif')} style={{width:100,height:100, margin:5}}></Image>
          <Text style={{fontSize:25, marginBottom: 25}}>Te sientes Cansad@</Text>
          <Image source={require('../../../../assets/informaciones/26.png')} style={styles.image}></Image>
          <Button
            title="salir"
            mode="contained"
            theme={{ roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} }}
            style= {styles.button}
            onPress={() => {
              props.navigation.navigate('Evaluacion')
            }}
          >
            <Text style={ styles.buttonText }>Confirmar</Text>
          </Button>
        </View>
      </View>
    )
  }else if( emocionNegative === 7){
    return(
      <View style={{flex: 1 , backgroundColor: "#F6F6F6", width: '100%'}}>
         <View style={{ flex:2, margin: 25,  backgroundColor:'#FFFFFF', borderRadius: 25, alignItems:'center', flexDirection:'column'}}>
          <Text style={{fontSize:30, marginBottom: 25, marginTop:10}}>Muchas Gracias por Evaluarte!!!</Text>
          <Image source={require('../../../../assets/emotes/emoji_sad.gif')} style={{width:100,height:100, margin:5}}></Image>
          <Text style={{fontSize:25, marginBottom: 25}}>Te sientes Triste</Text>
          <Image source={require('../../../../assets/informaciones/27.png')} style={styles.image}></Image>
          <Button
            title="salir"
            mode="contained"
            theme={{ roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} }}
            style= {styles.button}
            onPress={() => {
              props.navigation.navigate('Evaluacion')
            }}
          >
            <Text style={ styles.buttonText }>Confirmar</Text>
          
          </Button>
        </View>
      </View>
    )
  }else{
      return(
        <View style={{ flex:1, margin: 25, alignItems: 'center', justifyContent:'center'}}>
    
          <Text style={{fontSize:30, marginBottom: 25, marginTop:10}}>Muchas Gracias por Evaluarte</Text>
          <Button
            title="salir"
            mode="contained"
            theme={{ roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} }}
            style= {styles.button}
            onPress={() => {
              props.navigation.navigate('Evaluacion')
            }}
          >
            <Text style={ styles.buttonText }>Confirmar</Text>
          
          </Button>
            
        </View>
      )
  }
  
  
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    height: 50,
    width: 260,
    justifyContent: 'center',
    alignContent: 'center',
    fontFamily: 'niramit-regular'
  },
  buttonText: {
    fontFamily: 'niramit-semibold',
    fontSize: 20,
    paddingBottom: 3,
  },
  Card: {
    flex:2,
    flexDirection: 'column', 
    marginLeft: 20, 
    marginRight: 20, 
    marginTop: 10, 
    marginBottom: 10, 
    borderRadius: 25, 
    backgroundColor: '#ffffff'
  },
  image: {
    flex: 12,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
    //marginVertical: 40,
  },
  Head: {
    marginTop: -10,
    marginLeft: 15,
    marginRight: 15,
    alignContent:'center',
    flexDirection: 'row',
    flex: 12,
  },
  Title: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center'
  }
});

export default EvaluacionCompletaScreen;