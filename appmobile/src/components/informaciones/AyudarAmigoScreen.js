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
            <Text style={styles.titleText}>¿Como ayudar a un estudiante que quiere <Text style={styles.bold}>terminar con su vida?</Text></Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.item2}><Text style={styles.bold}>Acoge su pena,</Text> refuerza la idea que a <Text style={styles.bold}>todos nos afectan</Text> las cosas, pero la reacción a ellas es única.</Text>
            <View style={styles.container2}>
              <Text style={styles.item2}>Genera un clima <Text style={styles.bold}>de confianza,</Text> busca un lugar acogedor para conversar evitando un interrogatorio, refuerce que estás disponible para ESCÚCHARL@.</Text>
            </View>
            <Text style={styles.item2}><Text style={styles.bold}>Muéstrate preocupad@</Text> por lo que le sucede, <Text style={styles.bold}>mirándol@ a los ojos</Text> y dejando de hacer lo que te mantenía ocupado. Celular en <Text style={styles.bold}>modo avión.</Text></Text>
            <View style={styles.container2}>
              <Text style={styles.item2}>Invita discretamente a <Text style={styles.bold}>recordar eventos positivos</Text> que también están presentes en este momento, <Text style={styles.bold}>evite que se focalice en las cosas malas</Text> que le han pasado.</Text>
            </View>
            <Text style={styles.item2}>Muéstrale tu <Text style={styles.bold}>preocupación</Text> constante, refuerza que <Text style={styles.bold}>estás allí para acompañarl@.</Text></Text>
            <View style={styles.container2}>
              <Text style={styles.item2}>Incentíval@ a que le cuente a <Text style={styles.bold}>un adulto de su confianza,</Text> para que tenga una <Text style={styles.bold}>red de contención.</Text></Text>
            </View>
            <Text style={styles.item2}><Text style={styles.bold}>Acompáñal@ a buscar ayuda,</Text> respetando sus tiempos, dile que este proceso es importante y para poder estar mejor hay que <Text style={styles.bold}>buscar ayuda especializada.</Text></Text>
            <View style={styles.container2}>
              <Text style={styles.item2}><Text style={styles.bold}>Informa de esta situación</Text> a los encargados de <Text style={styles.bold}>convivencia escolar</Text> de tu establecimiento.</Text>
            </View>
          </View>
        </ScrollView>
      )
    } else if (tipo === 'apoderado') {
      return (
        <ScrollView style={styles.background}>
          <View style={styles.head}>
            <Text style={styles.titleText}>¿Como ayudar a mi pupilo/a si <Text style={styles.bold}>quiere terminar con su vida?</Text></Text>
          </View>
          <View style={styles.container}>
            <View style={styles.content}>
              <View style={styles.item}>
                <Text style={styles.text}><Text style={styles.bold}>Acoge su pena,</Text>refuerza la idea que a todos nos afectan las cosas de forma distinta, comenta que <Text style={styles.bold}>a su edad tú también te sentiste así</Text> y saliste adelante.</Text>
                <Image source={require('../../../assets/informaciones/22.png')} style={styles.image}></Image>
              </View>
              <View style={styles.item}>
                <Image source={require('../../../assets/informaciones/23.png')} style={styles.image}></Image>
                <Text style={styles.text}>Genera un clima <Text style={styles.bold}>de confianza,</Text> evitando un interrogatorio, refuerce que estás disponible para ESCÚCHARL@.</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.text}><Text style={styles.bold}>Muéstrate preocupad@</Text> por lo que le sucede, <Text style={styles.bold}>mirándolo a los ojos</Text> y dejando de hacer lo que te mantenía ocupado. Celular en <Text style={styles.bold}>modo avión.</Text></Text>
                <Image source={require('../../../assets/informaciones/24.png')} style={styles.image}></Image>
              </View>
              <View style={styles.item}>
                <Image source={require('../../../assets/informaciones/25.png')} style={styles.image}></Image>
                <Text style={styles.text}><Text style={styles.bold}>Acompáñal@</Text> en sus actividades.</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.text}>Discretamente <Text style={styles.bold}>desvía su atención de cosas malas que le han pasado.</Text> Haz referencia a situaciones positivas que también están presentes en su vida.</Text>
                <Image source={require('../../../assets/informaciones/26.png')} style={styles.image}></Image>
              </View>
              <View style={styles.item}>
                <Image source={require('../../../assets/informaciones/27.png')} style={styles.image}></Image>
                <Text style={styles.text}><Text style={styles.bold}>Acompáñal@ a buscar ayuda,</Text> respetando sus tiempos, dile que este proceso es importante y para poder estar mejor hay que <Text style={styles.bold}>buscar ayuda.</Text></Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.text}><Text style={styles.bold}>Mantente disponible</Text> para él/ella, cautela que no tenga acceso a medios letales (armas, cuerdas, medicamentos, etc.)</Text>
                <Image source={require('../../../assets/informaciones/28.png')} style={styles.image}></Image>
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
        <Text style={styles.titleText}>¿Como ayudar a un amigo/a que quiere <Text style={styles.bold}>terminar con su vida?</Text></Text>
      </View>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.item}>
            <Text style={styles.text}><Text style={styles.bold}>Acoge sin cuestionar su pena,</Text> a todos nos afectan las cosas de forma distinta.</Text>
            <Image source={require('../../../assets/informaciones/14.png')} style={styles.image}></Image>
          </View>
          <View style={styles.item}>
            <Image source={require('../../../assets/informaciones/15.png')} style={styles.image}></Image>
            <Text style={styles.text}>Hazle <Text style={styles.bold}>sentir en confianza,</Text> evita preguntar, ESCÚCHAL@.</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.text}><Text style={styles.bold}>Muéstrale preocupación</Text> por lo que le sucede, mirándolo a los ojos y dejando de hacer lo que te mantenía ocupado.</Text>
            <Image source={require('../../../assets/informaciones/16.png')} style={styles.image}></Image>
          </View>
          <View style={styles.item}>
            <Image source={require('../../../assets/informaciones/17.png')} style={styles.image}></Image>
            <Text style={styles.text}><Text style={styles.bold}>Desvía su atención de cosas malas que le han pasado.</Text> Haz referencia a situaciones positivas que también están presentes en su vida.</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>Muéstrale tu <Text style={styles.bold}>preocupación, atención y compañía</Text> constante, no dejes que se sienta sol@.</Text>
            <Image source={require('../../../assets/informaciones/18.png')} style={styles.image}></Image>
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