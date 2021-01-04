import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity, AsyncStorage, Image } from 'react-native'
import { Text, Divider, Avatar, Button } from 'react-native-paper'
import FitImage from 'react-native-fit-image';

class MejorarAnimoScreen extends Component {

  constructor() {
    super();
    this.state = {
      primero: {
        mostrar : <Text style={styles.item}>El que se quiere morir <Text style={styles.bold}>no lo dice.</Text></Text>,
        ocultar : <Text style={styles.item}>La mayoría de las personas que terminan con su vida, <Text style={styles.bold}>dan señales previas.</Text></Text>,
        boton: 'Mito',
        tema: { roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} },
      },
      segundo: {
        mostrar : <Text style={styles.item}><Text style={styles.bold}>No hay que hablar</Text> sobre suicidio con alguien que quiere suicidarse.</Text>,
        ocultar : <Text style={styles.item}>Es positivo <Text style={styles.bold}>escuchar y acompañar</Text> a alguien que tiene deseos de morir.</Text>,
        boton: 'Mito',
        tema: { roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} },
      },
      tercero: {
        mostrar : <Text style={styles.item}>Hay que <Text style={styles.bold}>incentivar</Text> a alguien con ideas suicidas para evitar que se mate.</Text>,
        ocultar : <Text style={styles.item}>Desafiar a un suicida es <Text style={styles.bold}>un acto irresponsable,</Text> pues es una persona que está sufriendo, desafiarlo no evitará que se suicide.</Text>,
        boton: 'Mito',
        tema: { roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} },
      },
      cuarto: {
        mostrar : <Text style={styles.item}>Sólo los <Text style={styles.bold}>profesionales</Text> de salud expertos pueden evitar que alguien se mate.</Text>,
        ocultar : <Text style={styles.item}>Personas <Text style={styles.bold}>no especialistas también pueden</Text> ayudar a prevenir el suicidio.</Text>,
        boton: 'Mito',
        tema: { roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} },
      },
      quinto: {
        mostrar : <Text style={styles.item}>El que intenta morir <Text style={styles.bold}>es un cobarde.</Text></Text>,
        ocultar : <Text style={styles.item}>El que intenta suicidarse <Text style={styles.bold}>no es valiente ni cobarde,</Text> es una persona que está sufriendo y siente que no hay otra opción.</Text>,
        boton: 'Mito',
        tema: { roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} },
      },
      sexto: {
        mostrar : <Text style={styles.item}>Si se <Text style={styles.bold}>mejoró</Text> de una crisis suicida <Text style={styles.bold}>nunca más</Text> lo intentará.</Text>,
        ocultar : <Text style={styles.item}>Muchos suicidios ocurren cuando hay un <Text style={styles.bold}>periodo de mejoría.</Text></Text>,
        boton: 'Mito',
        tema: { roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} },
      },
      septimo: {
        mostrar : <Text style={styles.item}>Todos los suicidas <Text style={styles.bold}>están deprimidos.</Text></Text>,
        ocultar : <Text style={styles.item}>Existe <Text style={styles.bold}>más posibilidad</Text> de que alguien deprimido intente quitarse la vida, pero <Text style={styles.bold}>no solamente</Text> los deprimidos lo intentan.</Text>,
        boton: 'Mito',
        tema: { roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} },
      },
      octavo: {
        mostrar : <Text style={styles.item}>Si intenta una vez suicidarse, lo <Text style={styles.bold}>intentará siempre.</Text></Text>,
        ocultar : <Text style={styles.item}>Cuando se recibe ayuda a tiempo, con un tratamiento adecuado, la persona <Text style={styles.bold}>podría no intentar nunca más</Text> quitarse la vida.</Text>,
        boton: 'Mito',
        tema: { roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} },
      },
      noveno: {
        mostrar : <Text style={styles.item}>Cuando alguien decide terminar con su vida <Text style={styles.bold}>no hay nada que se pueda hacer</Text> para evitarlo.</Text>,
        ocultar : <Text style={styles.item}>Cuando alguien decide terminar con su vida existe la posibilidad de <Text style={styles.bold}>cambiar su decisión</Text> con acompañamiento constante y ayuda profesional.</Text>,
        boton: 'Mito',
        tema: { roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} },
      },
    }
  }

  cambiar = (id) => {
    let boton = 'Mito';
    let tema = { roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} };

    if (this.state[id].boton === 'Mito') {
      boton = 'Realidad';
      tema = { roundness: 25, colors: { primary: '#57457F', text:'#B3FFFD'} };
    }

    let item = {
      mostrar: this.state[id].ocultar,
      ocultar: this.state[id].mostrar,
      boton: boton,
      tema: tema,
    }

    this.setState({
      [id]: item,
    });
  }

  render(){
    return (
      <ScrollView style={styles.background}>
        <View style={styles.head}>
          <Text style={styles.titleText}>Mitos y realidades <Text style={styles.titleBold}>del suicidio</Text></Text>
        </View>
        <Divider style={styles.divider}/>
        <Text style={styles.subtitleText}>A continuación te invitamos a descubrir la realidad detrás de cada mito sobre el suicidio. Para ello, deberás <Text style={styles.bold}>presionar el botón de "Mito"</Text> para revelar la realidad de cada uno de los siguientes:</Text>
        
        <View style={styles.container}>
          <Avatar.Text size={50} color="#B3FFFD" label="1" style={styles.number}/>
          <View style={styles.containerButton}>
            <Button
              title="mito"
              mode="contained"
              theme={this.state.primero.tema}
              style= {styles.button}
              onPress={() => {this.cambiar('primero')}}>
                <Text style={ styles.buttonText }>{ this.state.primero.boton }</Text>
            </Button>
          </View>
          { this.state.primero.mostrar }
        </View>

        <View style={styles.container}>
          <Avatar.Text size={50} color="#B3FFFD" label="2" style={styles.number}/>
          <View style={styles.containerButton}>
            <Button
              title="mito"
              mode="contained"
              theme={this.state.segundo.tema}
              style= {styles.button}
              onPress={() => {this.cambiar('segundo')}}>
                <Text style={ styles.buttonText }>{ this.state.segundo.boton }</Text>
            </Button>
          </View>
          { this.state.segundo.mostrar }
        </View>

        <View style={styles.container}>
          <Avatar.Text size={50} color="#B3FFFD" label="3" style={styles.number}/>
          <View style={styles.containerButton}>
            <Button
              title="mito"
              mode="contained"
              theme={this.state.tercero.tema}
              style= {styles.button}
              onPress={() => {this.cambiar('tercero')}}>
                <Text style={ styles.buttonText }>{ this.state.tercero.boton }</Text>
            </Button>
          </View>
          { this.state.tercero.mostrar }
        </View>

        <View style={styles.container}>
          <Avatar.Text size={50} color="#B3FFFD" label="4" style={styles.number}/>
          <View style={styles.containerButton}>
            <Button
              title="mito"
              mode="contained"
              theme={this.state.cuarto.tema}
              style= {styles.button}
              onPress={() => {this.cambiar('cuarto')}}>
                <Text style={ styles.buttonText }>{ this.state.cuarto.boton }</Text>
            </Button>
          </View>
          { this.state.cuarto.mostrar }
        </View>

        <View style={styles.container}>
          <Avatar.Text size={50} color="#B3FFFD" label="5" style={styles.number}/>
          <View style={styles.containerButton}>
            <Button
              title="mito"
              mode="contained"
              theme={this.state.quinto.tema}
              style= {styles.button}
              onPress={() => {this.cambiar('quinto')}}>
                <Text style={ styles.buttonText }>{ this.state.quinto.boton }</Text>
            </Button>
          </View>
          { this.state.quinto.mostrar }
        </View>

        <View style={styles.container}>
          <Avatar.Text size={50} color="#B3FFFD" label="6" style={styles.number}/>
          <View style={styles.containerButton}>
            <Button
              title="mito"
              mode="contained"
              theme={this.state.sexto.tema}
              style= {styles.button}
              onPress={() => {this.cambiar('sexto')}}>
                <Text style={ styles.buttonText }>{ this.state.sexto.boton }</Text>
            </Button>
          </View>
          { this.state.sexto.mostrar }
        </View>

        <View style={styles.container}>
          <Avatar.Text size={50} color="#B3FFFD" label="7" style={styles.number}/>
          <View style={styles.containerButton}>
            <Button
              title="mito"
              mode="contained"
              theme={this.state.septimo.tema}
              style= {styles.button}
              onPress={() => {this.cambiar('septimo')}}>
                <Text style={ styles.buttonText }>{ this.state.septimo.boton }</Text>
            </Button>
          </View>
          { this.state.septimo.mostrar }
        </View>

        <View style={styles.container}>
          <Avatar.Text size={50} color="#B3FFFD" label="8" style={styles.number}/>
          <View style={styles.containerButton}>
            <Button
              title="mito"
              mode="contained"
              theme={this.state.octavo.tema}
              style= {styles.button}
              onPress={() => {this.cambiar('octavo')}}>
                <Text style={ styles.buttonText }>{ this.state.octavo.boton }</Text>
            </Button>
          </View>
          { this.state.octavo.mostrar }
        </View>

        <View style={styles.container}>
          <Avatar.Text size={50} color="#B3FFFD" label="9" style={styles.number}/>
          <View style={styles.containerButton}>
            <Button
              title="mito"
              mode="contained"
              theme={this.state.noveno.tema}
              style= {styles.button}
              onPress={() => {this.cambiar('noveno')}}>
                <Text style={ styles.buttonText }>{ this.state.noveno.boton }</Text>
            </Button>
          </View>
          { this.state.noveno.mostrar }
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 25, 
    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
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
    color: '#57457F',
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
    backgroundColor: '#57457F'
  },
  subtitleText: {
    fontFamily: 'niramit-regular',
    color: '#57457F',
    fontSize: 17,
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 20,
    marginHorizontal: 35,
    textAlign: 'center',
    alignContent: 'center',
  },
  titleBold: {
    //fontSize: 20,
    fontFamily: 'niramit-bold',
    color: '#57457F',
  },
  content: {
    flexDirection: 'column',
    margin: 15  
  },
  number: {
    marginHorizontal: 20,
    marginTop: 10,
    alignSelf: 'flex-start',
    margin: -50,
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
  button: {
    height: 50,
    width: 100,
    fontSize: 20,
    justifyContent: 'center',
    alignContent: 'center',
    //borderColor: '#57457F'
  },
  buttonText: {
    fontFamily: 'niramit-bold',
  }
});

export default MejorarAnimoScreen;