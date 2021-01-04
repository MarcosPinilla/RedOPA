import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import UpdatePasswordScreen from './UpdatePasswordScreen';

class UpdatePasswordComponent extends Component {
  /*async getUser () {
    let user = await AsyncStorage.getItem('nombres');
    this.setState({user});
  }*/

  constructor (props) {
    super(props);

    this.state = {
      password_defecto: '',
      password_nuevo: '',
      password_repetido: ''
    };

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
    const user = { password_defecto: this.state.password_defecto, password_nuevo: this.state.password_nuevo, password_repetido: this.state.password_repetido };
    return (
      <View style={styles.container}>
        <UpdatePasswordScreen
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
    flexDirection: 'column',
  },
});

export default UpdatePasswordComponent;