import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity, AsyncStorage, Image } from 'react-native'
import { Text, Divider, Avatar, Button } from 'react-native-paper'
import FitImage from 'react-native-fit-image';
import { Linking } from 'expo';

class MejorarAnimoScreen extends Component {

  constructor() {
    super();
    
  }

  seguirEnlace = (enlace) => {
    Linking.openURL(enlace);
  }

  render(){
    return (
      <ScrollView style={styles.background}>
        <View style={styles.head}>
          <Text style={styles.titleText}>Visita los siguientes sitios para mayor información:</Text>
        </View>
        
        <TouchableOpacity onPress={() => {this.seguirEnlace('http://opa.cl')}}>
          <View style={styles.container1}>
            <Text style={styles.text1}>OPA</Text>
            <Image source={require('../../../assets/informaciones/logos/logo-opa.png')} style={styles.image}/>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {this.seguirEnlace('https://www.paho.org/chi/')}}>
          <View style={styles.container2}>
            <Text style={styles.text1}>OPS Chile</Text>
            <Image source={require('../../../assets/informaciones/logos/logo_OMS.png')} style={styles.image}/>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => {this.seguirEnlace('https://www.junaeb.cl/habilidades-para-la-vida')}}>
          <View style={styles.container3}>
            <Text style={styles.text3}>Habilidades para la vida, JUNAEB</Text>
            <Image source={require('../../../assets/informaciones/logos/logo_junaeb.png')} style={styles.image}/>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => {this.seguirEnlace('http://www.cuidatuanimo.org')}}>
          <View style={styles.container4}>
            <Text style={styles.text1}>Cuida tu Ánimo</Text>
            <Image source={require('../../../assets/informaciones/logos/logo-cuida-animo.png')} style={styles.image}/>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => {this.seguirEnlace('http://www.achid.cl')}}>
          <View style={styles.container5}>
            <Text style={styles.text5}>ACHID</Text>
            <Image source={require('../../../assets/informaciones/logos/logo-achidok.jpg')} style={styles.image}/>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => {this.seguirEnlace('https://www.fsummer.org')}}>
          <View style={styles.container6}>
            <Text style={styles.text6}>Fundación Summer</Text>
            <Image source={require('../../../assets/informaciones/logos/logo_fund_kattysummer.png')} style={styles.image}/>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => {this.seguirEnlace('https://fundacionbelen.org')}}>
          <View style={styles.container5}>
            <Text style={styles.text7}>Fundación Belén</Text>
            <Image source={require('../../../assets/informaciones/logos/logo_fund_belen.png')} style={styles.image}/>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => {this.seguirEnlace('https://www.fundacionjoseignacio.org')}}>
          <View style={styles.container8}>
            <Text style={styles.text1}>Fundación José Ignacio</Text>
            <Image source={require('../../../assets/informaciones/logos/logo-jose.png')} style={styles.image}/>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => {this.seguirEnlace('https://todomejora.org')}}>
          <View style={styles.container9}>
            <Text style={styles.text9}>Todo Mejora</Text>
            <Image source={require('../../../assets/informaciones/logos/logo-todo-mejora.png')} style={styles.image}/>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => {this.seguirEnlace('https://www.tdesperanza.cl/')}}>
          <View style={styles.container5}>
            <Text style={styles.text10}>Fundación Tierra de Esperanza</Text>
            <Image source={require('../../../assets/informaciones/logos/logo_org_altura.png')} style={styles.image}/>
          </View>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#F6F6F6'
  },
  head: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center', 
  },
  titleText : {
    fontFamily: 'niramit-regular',
    color: '#57457F',
    fontSize: 26,
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 15,
    marginHorizontal: 35,
    textAlign: 'center',
    alignContent: 'center',
  },
  image: {
    flex: 7,
    width: undefined,
    height: 100,
    resizeMode: 'contain',
    //marginVertical: 40,
  },
  text1: {
    fontFamily: 'niramit-bold',
    color: '#FFFFFF',
    fontSize: 20,
    flex: 5,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  container1: {
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 25,
    paddingVertical: 40,
    paddingRight: 10,
    backgroundColor: '#57457F',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  container2: {
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 25,
    paddingVertical: 40,
    paddingRight: 10,
    backgroundColor: '#0099D9',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  text3: {
    fontFamily: 'niramit-bold',
    color: '#454954',
    fontSize: 20,
    flex: 5,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  container3: {
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 25,
    paddingVertical: 40,
    paddingRight: 10,
    backgroundColor: '#E4E4E4',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  container4: {
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 25,
    paddingVertical: 40,
    paddingRight: 10,
    backgroundColor: '#39579B',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  text5: {
    fontFamily: 'niramit-bold',
    color: '#F4475B',
    fontSize: 20,
    flex: 5,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  container5: {
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 25,
    paddingVertical: 40,
    paddingRight: 10,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  text6: {
    fontFamily: 'niramit-bold',
    color: '#E65F69',
    fontSize: 20,
    flex: 5,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  container6: {
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 25,
    paddingVertical: 40,
    paddingRight: 10,
    backgroundColor: '#393939',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  text7: {
    fontFamily: 'niramit-bold',
    color: '#33538C',
    fontSize: 20,
    flex: 5,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  container8: {
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 25,
    paddingVertical: 40,
    paddingRight: 10,
    backgroundColor: '#FF5000',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  text9: {
    fontFamily: 'niramit-bold',
    color: '#572567',
    fontSize: 20,
    flex: 5,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  container9: {
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 25,
    paddingVertical: 40,
    paddingRight: 10,
    backgroundColor: '#F9F9F9',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  text10: {
    fontFamily: 'niramit-bold',
    color: '#01B496',
    fontSize: 20,
    flex: 5,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default MejorarAnimoScreen;