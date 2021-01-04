import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import RecoverPasswordScreen from './RecoverPasswordScreen';

class RecoverPasswordComponent extends Component {
  /*async getUser () {
    let user = await AsyncStorage.getItem('nombres');
    this.setState({user});
  }*/

  constructor (props) {
    super(props);

    this.state = {
    };
    rut: '',

    this.goTo = this.goTo.bind(this);
  }

  /*componentDidMount () {
    this.getUser();
  }*/

  handleChange = (name, value) => {
    const data = {[name]: value};
    this.setState(data)
  }
  
  goTo = (path) => {
    this.props.navigation.navigate(path)
  }

  render() {
    const user = { rut: this.state.rut };
    return (
      <View style={styles.container}>
        <RecoverPasswordScreen
          goTo={this.goTo}
          handleChange={this.handleChange}
          user={user}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection: 'column',
  },
});

export default RecoverPasswordComponent;