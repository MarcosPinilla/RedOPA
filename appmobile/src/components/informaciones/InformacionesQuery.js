import React from 'react';
import { View, StyleSheet } from 'react-native'
import { Divider, Avatar, List, ActivityIndicator, Button, Text, Image} from 'react-native-paper';

function InformacionesQuery  (props) {

  const { goTo, tipo } = props;

  let textMejorarAnimo = <Text style={styles.name}>Estrategias para <Text style={styles.bold}>mejorar tu ánimo</Text></Text>;
  let textAyudarAmigo = <Text style={styles.name}>¿Cómo ayudar a un amigo/a <Text style={styles.bold}>que quiere terminar con su vida?</Text></Text>;
  let textContactosAyuda = <Text style={styles.name}>¿Quién puede ayudar a un@ amig@ <Text style={styles.bold}>que quiere terminar con su vida?</Text></Text>;
  let textSenalesAlerta = <Text style={styles.name}>Señales de alerta <Text style={styles.bold}>de suicidio</Text></Text>;
  let textMitosRealidades = <Text style={styles.name}>Mitos y realidades <Text style={styles.bold}>del suicidio</Text></Text>;
  let textEnlacesInteres = <Text style={styles.name}>Enlaces de interés para <Text style={styles.bold}>mayor información</Text></Text>;

  if (tipo !== null && tipo !== undefined) {
    if (tipo === 'apoderado') {
      textMejorarAnimo = <Text style={styles.name}>Estrategias para mejorar <Text style={styles.bold}>el ánimo de tu pupilo</Text></Text>;
      textAyudarAmigo = <Text style={styles.name}>¿Cómo ayudar a mi pupilo/a si <Text style={styles.bold}>quiere terminar con su vida?</Text></Text>;
      textContactosAyuda = <Text style={styles.name}>¿Quién puede ayudar a mi pupil@ <Text style={styles.bold}>si quiere terminar con su vida?</Text></Text>;
    } else if (tipo === 'funcionario') {
      textMejorarAnimo = <Text style={styles.name}>Estrategias para <Text style={styles.bold}>mejorar el ánimo</Text> de tu estudiante</Text>;
      textAyudarAmigo = <Text style={styles.name}>¿Cómo ayudar a un estudiante que quiere <Text style={styles.bold}>terminar con su vida?</Text></Text>;
      textContactosAyuda = <Text style={styles.name}>¿Quién puede ayudar a un@ estudiante <Text style={styles.bold}>que quiere terminar con su vida?</Text></Text>;
    }
  }
  
  return (
    <View style={{alignItems:'stretch',}}>
      <View style={{marginHorizontal: 25, marginVertical:15, borderRadius: 25, backgroundColor: '#ffffff', paddingBottom: 25}}>
        <View style={styles.head}>
          { textMejorarAnimo }
        </View>
        <View style={styles.body}>
          <Button style={styles.button}
            title="ievaluar"
            mode="contained"
            theme={{ roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} }}
            style= {styles.button}
            onPress={ () => {goTo('MejorarAnimoScreen', { tipo })} }><Text style={ styles.buttonText }>Ver</Text>
          </Button>
        </View>
      </View>

      <View style={{marginHorizontal: 25, marginVertical: 15, borderRadius: 25, backgroundColor: '#ffffff', paddingBottom: 25}}>
        <View style={styles.head}>
          { textAyudarAmigo }
        </View>
        <View style={styles.body}>
          <Button style={styles.button}
            title="ievaluar"
            mode="contained"
            theme={{ roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} }}
            style= {styles.button}
            onPress={() => {goTo('AyudarAmigoScreen', { tipo })}}><Text style={ styles.buttonText }>Ver</Text>
          </Button>
        </View>
      </View>
      
      <View style={{marginHorizontal: 25, marginVertical:15, borderRadius: 25, backgroundColor: '#ffffff', paddingBottom: 25}}>
        <View style={styles.head}>
          { textContactosAyuda }
        </View>
        <View style={styles.body}>
          <Button style={styles.button}
            title="ievaluar"
            mode="contained"
            theme={{ roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} }}
            style= {styles.button}
            onPress={() => {goTo('ContactosAyudaScreen')}}><Text style={ styles.buttonText }>Ver</Text>
          </Button>
        </View>
      </View>
      
      <View style={{marginHorizontal: 25, marginVertical:15, borderRadius: 25, backgroundColor: '#ffffff', paddingBottom: 25}}>
        <View style={styles.head}>
          { textSenalesAlerta }
        </View>
        <View style={styles.body}>
          <Button style={styles.button}
            title="ievaluar"
            mode="contained"
            theme={{ roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} }}
            style= {styles.button}
            onPress={() => {goTo('SenalesAlertaScreen')}}><Text style={ styles.buttonText }>Ver</Text>
          </Button>
        </View>
      </View>
      
      <View style={{marginHorizontal: 25, marginVertical:15, borderRadius: 25, backgroundColor: '#ffffff', paddingBottom: 25}}>
        <View style={styles.head}>
          { textMitosRealidades }
        </View>
        <View style={styles.body}>
          <Button style={styles.button}
            title="ievaluar"
            mode="contained"
            theme={{ roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} }}
            style= {styles.button}
            onPress={() => {goTo('MitosRealidadesScreen')}}><Text style={ styles.buttonText }>Ver</Text>
          </Button>
        </View>
      </View>
      
      <View style={{marginHorizontal: 25, marginVertical:15, borderRadius: 25, backgroundColor: '#ffffff', paddingBottom: 25}}>
        <View style={styles.head}>
          { textEnlacesInteres }
        </View>
        <View style={styles.body}>
          <Button style={styles.button}
            title="ievaluar"
            mode="contained"
            theme={{ roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} }}
            style= {styles.button}
            onPress={() => {goTo('EnlacesInteresScreen')}}><Text style={ styles.buttonText }>Ver</Text>
          </Button>
        </View>
      </View>

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
    fontFamily: 'niramit-regular',
    alignItems: 'center',
    textAlign: 'center',
  },
  bold: {
    fontSize: 28,
    fontFamily: 'niramit-bold',
    textAlign: 'center',
  },
  body:{
    flexDirection:'row',
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'center',
    alignContent: 'center'
  }
});

export default InformacionesQuery;