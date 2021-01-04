import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity, AsyncStorage, Image } from 'react-native'
import { Text, Divider} from 'react-native-paper'
import FitImage from 'react-native-fit-image';

const MejorarAnimoScreen = (props) => {

  const { goTo, handleChange, goBack} = props;

  return (
    <ScrollView style={styles.background}>
      <FitImage source={require('../../../assets/informaciones/banner2.jpg')} style={styles.backgroundImage}/>
      <View style={styles.head}>
        <Text style={styles.titleText}>Señales de alerta <Text style={styles.titleBold}>de suicidio</Text></Text>
      </View>
      <Divider style={styles.divider}/>
      <Text style={styles.subtitleText}>Si un estudiante está pensando en terminar con su vida podría presentar algunas de las siguientes señales:</Text>
      <View style={styles.container}>
        <Text style={styles.item}>Buscar armas de fuego, pastillas u otro <Text style={styles.bold}>medio letal.</Text></Text>
        <View style={styles.container2}>
          <Text style={styles.item}>Planificar <Text style={styles.bold}>su muerte</Text> (lugar, medio, etc).</Text>
        </View>
        <Text style={styles.item}>Enviar <Text style={styles.bold}>cartas o mensajes</Text> por redes sociales despidiéndose.</Text>
        <View style={styles.container2}>
          <Text style={styles.item}>Hablar asumiendo que <Text style={styles.bold}>no estará</Text> presente en el futuro.</Text>
        </View>
        <Text style={styles.item}>Presentar <Text style={styles.bold}>cortes</Text> en muñecas, muslos, etc.</Text>
        <View style={styles.container2}>
          <Text style={styles.item}>Amenazar con <Text style={styles.bold}>herirse o matarse.</Text></Text>
        </View>
        <Text style={styles.item}>Decir que <Text style={styles.bold}>no tiene razones</Text> para vivir.</Text>
        <View style={styles.container2}>
          <Text style={styles.item}>Sentirse atrapado, bloqueado o sufrir un dolor que <Text style={styles.bold}>no puede soportar.</Text></Text>
        </View>
        <Text style={styles.item}>Sentirse una <Text style={styles.bold}>carga para otros</Text> (amigos, familia, etc.) o el responsable de todo lo malo que sucede.</Text>
        <View style={styles.container2}>
          <Text style={styles.item}><Text style={styles.bold}>Alejarse</Text> de su familia, amigos y redes sociales.</Text>
        </View>
        <Text style={styles.item}>Bajar su <Text style={styles.bold}>rendimiento</Text> académico.</Text>
        <View style={styles.container2}>
          <Text style={styles.item}>Aumentar <Text style={styles.bold}>su consumo</Text> de alcohol y/o drogas.</Text>
        </View>
        <Text style={styles.item}>Presentar <Text style={styles.bold}>cambios abruptos</Text> de ánimo.</Text>
        <View style={styles.container2}>
          <Text style={styles.item}>Dejar de lado <Text style={styles.bold}>su imagen personal</Text> y/o presentar abandono/descuido de sí mismo.</Text>
        </View>
        <Text style={styles.item}>Haber sufrido uno o varios <Text style={styles.bold}>eventos traumáticos</Text> en los últimos tres meses.</Text>
        <View style={styles.footer}>
          <Text style={styles.footerText}>(SEREMI Salud Región de La Araucanía)</Text>
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
  backgroundImage: {
    marginBottom: -300,
    //flex: 1,
    //resizeMode: 'center',
    width: '100%',
    height: 300,
  },
  titleText : {
    fontFamily: 'niramit-regular',
    color: '#FFFFFF',
    fontSize: 26,
    alignSelf: 'center',
    marginTop: 15,
    marginHorizontal: 35,
    textAlign: 'center',
    alignContent: 'center',
  },
  divider: {
    height: 3,
    marginTop: 10,
    marginHorizontal: 145,
    backgroundColor: '#b3fffd'
  },
  subtitleText: {
    fontFamily: 'niramit-regular',
    color: '#FFFFFF',
    fontSize: 17,
    alignSelf: 'center',
    marginTop: 15,
    marginHorizontal: 35,
    textAlign: 'center',
    alignContent: 'center',
  },
  titleBold: {
    //fontSize: 20,
    fontFamily: 'niramit-bold',
    color: '#FFFFFF',
  },
  content: {
    flexDirection: 'column',
    margin: 15  
  },
  item: {
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
  container2: {
    width: '100%',
    backgroundColor: '#f6f6f6',
  },
  bold: {
    //fontSize: 20,
    fontFamily: 'niramit-bold',
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
    flexDirection:'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 11,
    fontFamily: 'niramit-italic',
    marginBottom: 30,
    textAlign: 'center',
  }
});

export default MejorarAnimoScreen;