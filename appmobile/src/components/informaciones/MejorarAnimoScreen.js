import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity, AsyncStorage, Image } from 'react-native'
import { Text, Divider, Button, Avatar, TextInput, List} from 'react-native-paper'

const MejorarAnimoScreen = (props) => {

  let tipo = props.navigation.state.params.props.tipo;

  if (tipo !== null && tipo !== undefined) {
    if (tipo === 'funcionario') {
      return (
        <ScrollView style={styles.background}>
          <View style={styles.head}>
            <Text style={styles.titleText}>Estrategias para <Text style={styles.bold}>mejorar el ánimo</Text> de tu estudiante</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.item2}>Dile <Text style={styles.bold}>3 cosas positivas o logros</Text> sobre su persona.</Text>
            <View style={styles.container2}>
              <Text style={styles.item2}><Text style={styles.bold}>Incentíval@ a que sonría,</Text> aunque no tenga ganas de hacerlo (ej. cuéntale un chiste).</Text>
            </View>
            <Text style={styles.item2}>Motíval@ a que <Text style={styles.bold}>cambie su postura,</Text> que adopte una posición erguida.</Text>
            <View style={styles.container2}>
              <Text style={styles.item2}>Invítal@ a que ponga una mano en su corazón <Text style={styles.bold}>y sienta sus latidos.</Text></Text>
            </View>
            <Text style={styles.item2}>Intenta que escuche <Text style={styles.bold}>música que l@ haga feliz.</Text></Text>
            <View style={styles.container2}>
              <Text style={styles.item2}>Incentíval@ a que tome una hoja en blanco y <Text style={styles.bold}>escriba 10 cosas que le han dado felicidad.</Text></Text>
            </View>
            <Text style={styles.item2}>Invítal@ a <Text style={styles.bold}>mirar fotografías</Text> o recuerdos de <Text style={styles.bold}>momentos felices.</Text></Text>
            <View style={styles.container2}>
              <Text style={styles.item2}><Text style={styles.bold}>Incítal@ a arréglarse,</Text> buscas su ropa favorita.</Text>
            </View>
            <Text style={styles.item2}>Anímal@ a hacer algún <Text style={styles.bold}>ejercicio que le guste.</Text></Text>
            <View style={styles.container2}>
              <Text style={styles.item2}>Invítal@ a <Text style={styles.bold}>comunicarse con un amig@</Text> que lo haga reír.</Text>
            </View>
            <Text style={styles.item2}>Comparte un <Text style={styles.bold}>caramelo</Text> o un <Text styles={styles.bold}>trocito de chocolate.</Text></Text>
          </View>
        </ScrollView>
      )
    } else if (tipo === 'apoderado') {
      return (
        <ScrollView style={styles.background}>
          <View style={styles.head}>
            <Text style={styles.titleText}>Estrategias para mejorar <Text style={styles.bold}>el ánimo de tu pupilo</Text></Text>
          </View>
          <View style={styles.container}>
            <View style={styles.content}>
              <View style={styles.item}>
                <Text style={styles.text}><Text style={styles.bold}>Acoge su pena,</Text> refuerza que estás con él/ella y que esto también pasará.</Text>
                <Image source={require('../../../assets/informaciones/19.png')} style={styles.image}></Image>
              </View>
              <View style={styles.item}>
                <Image source={require('../../../assets/informaciones/20.png')} style={styles.image}></Image>
                <Text style={styles.text}>Dile <Text style={styles.bold}>5 cosas</Text> por las que estás <Text style={styles.bold}>orgullos@ el/ella.</Text></Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.text}><Text style={styles.bold}>ABRÁZAL@,</Text> como mínimo por un minuto.</Text>
                <Image source={require('../../../assets/informaciones/21.png')} style={styles.image}></Image>
              </View>
              <View style={styles.item}>
                <Image source={require('../../../assets/informaciones/1.png')} style={styles.image}></Image>
                <Text style={styles.text}><Text style={styles.bold}>Incentíval@ a que sonría,</Text> aunque no tenga ganas de hacerlo.</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.text}>Motíval@ a que <Text style={styles.bold}>cambie su postura,</Text> adopte una posición erguida.</Text>
                <Image source={require('../../../assets/informaciones/2.png')} style={styles.image}></Image>
              </View>
              <View style={styles.item}>
                <Image source={require('../../../assets/informaciones/27.png')} style={styles.image}></Image>
                <Text style={styles.text}>Invítal@ y acompáñal@ a que juntos, cada uno <Text style={styles.bold}>pongan una mano en su corazón y sientan sus latidos.</Text></Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.text}>Invítal@ y acompáñal@ a <Text style={styles.bold}>realizar ejercicios de respiración,</Text> toma aire y bota aire contando hasta 4, repite 4 veces.</Text>
                <Image source={require('../../../assets/informaciones/3.png')} style={styles.image}></Image>
              </View>
              <View style={styles.item}>
                <Image source={require('../../../assets/informaciones/4.png')} style={styles.image}></Image>
                <Text style={styles.text}>Intenta que escuche <Text style={styles.bold}>música que l@ haga feliz,</Text> o tú <Text style={styles.bold}>pon música de momentos felices.</Text></Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.text}>Incentíval@ a que tome una hoja en blanco y escriba <Text style={styles.bold}>10 cosas que le han dado felicidad,</Text> ayúdal@ a recordar.</Text>
                <Image source={require('../../../assets/informaciones/05.png')} style={styles.image}></Image>
              </View>
              <View style={styles.item}>
                <Image source={require('../../../assets/informaciones/06.png')} style={styles.image}></Image>
                <Text style={styles.text}>Muéstrale o invítal@ a <Text style={styles.bold}>mirar fotografías o recuerdos</Text> de <Text style={styles.bold}>momentos felices.</Text></Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.text}>Ayúdalo o incítal@ a arreglarse, a buscar su <Text style={styles.bold}>ropa favorita,</Text> e <Text style={styles.bold}>invítal@ a salir.</Text></Text>
                <Image source={require('../../../assets/informaciones/07.png')} style={styles.image}></Image>
              </View>
              <View style={styles.item}>
                <Image source={require('../../../assets/informaciones/08.png')} style={styles.image}></Image>
                <Text style={styles.text}>Anímal@ a hacer algún <Text style={styles.bold}>ejercicio que le guste.</Text></Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.text}>Invítal@ a comunicarse con un <Text style={styles.bold}>amig@ que lo haga reír.</Text></Text>
                <Image source={require('../../../assets/informaciones/09.png')} style={styles.image}></Image>
              </View>
              <View style={styles.item}>
                <Image source={require('../../../assets/informaciones/13.png')} style={styles.image}></Image>
                <Text style={styles.text}><Text style={styles.bold}>Convídale un caramelo</Text> o un trocito de chocolate.</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )
    }
  }

  return (
    <ScrollView style={styles.background}>
      <View style={styles.head}>
        <Text style={styles.titleText}>Estrategias para <Text style={styles.bold}>mejorar tu ánimo</Text></Text>
      </View>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.item}>
            <Text style={styles.text}><Text style={styles.bold}>Sonríe,</Text> aunque no tengas ganas de hacerlo.</Text>
            <Image source={require('../../../assets/informaciones/1.png')} style={styles.image}></Image>
          </View>
          <View style={styles.item}>
            <Image source={require('../../../assets/informaciones/2.png')} style={styles.image}></Image>
            <Text style={styles.text}><Text style={styles.bold}>Cambia la postura,</Text> adopta una posición <Text style={styles.bold}>erguida,</Text> tu espalda afirmada en la silla, pies sin cruzar y firmes en el piso.</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>Haz <Text style={styles.bold}>ejercicios de respiración,</Text> toma aire y bota aire contando hasta 4, repite 4 veces.</Text>
            <Image source={require('../../../assets/informaciones/3.png')} style={styles.image}></Image>
          </View>
          <View style={styles.item}>
            <Image source={require('../../../assets/informaciones/4.png')} style={styles.image}></Image>
            <Text style={styles.text}><Text style={styles.bold}>Escucha música</Text> con la que te sientas <Text style={styles.bold}>feliz y tranquilo.</Text></Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>Toma una <Text style={styles.bold}>hoja en blanco</Text> y escribe <Text style={styles.bold}>10 cosas</Text> que te han hecho feliz.</Text>
            <Image source={require('../../../assets/informaciones/05.png')} style={styles.image}></Image>
          </View>
          <View style={styles.item}>
            <Image source={require('../../../assets/informaciones/06.png')} style={styles.image}></Image>
            <Text style={styles.text}><Text style={styles.bold}>Mira las fotografías</Text> o recuerdos de <Text style={styles.bold}>momentos felices.</Text></Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.text}><Text style={styles.bold}>Arréglate,</Text> busca tu ropa favorita.</Text>
            <Image source={require('../../../assets/informaciones/07.png')} style={styles.image}></Image>
          </View>
          <View style={styles.item}>
            <Image source={require('../../../assets/informaciones/08.png')} style={styles.image}></Image>
            <Text style={styles.text}><Text style={styles.bold}>Sal a caminar</Text> o a hacer algún <Text style={styles.bold}>ejercicio</Text> que te guste.</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.text}><Text style={styles.bold}>Comunícate</Text> con es@ <Text styles={styles.bold}>amig@</Text> que te hace <Text styles={styles.bold}>reír.</Text></Text>
            <Image source={require('../../../assets/informaciones/09.png')} style={styles.image}></Image>
          </View>
          <View style={styles.item}>
            <Image source={require('../../../assets/informaciones/10.png')} style={styles.image}></Image>
            <Text style={styles.text}><Text style={styles.bold}>Abraza</Text> por <Text style={styles.bold}>1 minuto</Text> a alguien de tu confianza.</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>Deja que el <Text style={styles.bold}>sol o una luz</Text> intensa <Text styles={styles.bold}>iluminen tu rostro.</Text></Text>
            <Image source={require('../../../assets/informaciones/11.png')} style={styles.image}></Image>
          </View>
          <View style={styles.item}>
            <Image source={require('../../../assets/informaciones/12.png')} style={styles.image}></Image>
            <Text style={styles.text}>Siente algún <Text style={styles.bold}>aroma agradable.</Text></Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>Cómete un <Text style={styles.bold}>caramelo</Text> o un <Text styles={styles.bold}>trocito de chocolate.</Text></Text>
            <Image source={require('../../../assets/informaciones/13.png')} style={styles.image}></Image>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    borderRadius: 25, 
    backgroundColor: '#ffffff'
  },
  background: {
    backgroundColor: '#F6F6F6'
  },
  titleText : {
    fontFamily: 'niramit-regular',
    color: '#57457F',
    fontSize: 26,
    alignSelf: 'center',
    marginTop: 15,
    marginHorizontal: 35,
    textAlign: 'center',
    alignContent: 'center',
  },
  bold: {
    //fontSize: 20,
    fontFamily: 'niramit-bold',
  },
  content: {
    flexDirection: 'column',
    margin: 15  
  },
  container2: {
    width: '100%',
    backgroundColor: '#f6f6f6',
  },
  item: {
    flexDirection: 'row',
    marginVertical: 8,
    fontSize: 25,
    fontFamily: 'niramit-regular',
    flexWrap: 'nowrap',
    marginBottom: 20,
  },
  item2: {
    marginVertical: 20,
    marginHorizontal: 30,
    fontSize: 17,
    fontFamily: 'niramit-regular',
    flexWrap: 'nowrap',
    //marginBottom: 20,
    color: '#57457F',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  text :{
    fontFamily: 'niramit-regular',
    color: '#57457F',
    fontSize: 20,
    flex: 6,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  image: {
    flex: 6,
    width: 100,
    //height: 100,
  },
  head: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center', 
  },
  footer:{
    flexDirection:'row-reverse'
  },
  footerText: {
    fontSize: 12,
    fontWeight: 'bold',
    margin: 15
  }
});

export default MejorarAnimoScreen;