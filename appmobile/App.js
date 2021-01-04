import React, { Component }  from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { AppRegistry } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';
import { ApolloLink, Observable } from 'apollo-link';
import { AppLoading } from 'expo';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import AppSwitchNavigator from './src/navigations/AppSwitchNavigator';

import * as Font from 'expo-font';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducers from './src/rdx/reducers'; 

console.disableYellowBox = ['Remote debugger'];

const request = async (operation) => {
  const token = await AsyncStorage.getItem('token');

  if(token){
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  }  
};

const requestLink = new ApolloLink((operation, forward) =>
  new Observable(observer => {
    let handle;
    Promise.resolve(operation)
      .then(oper => request(oper))
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
      .catch(observer.error.bind(observer));

    return () => {
      if (handle) handle.unsubscribe();
    };
  })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    requestLink,
    new HttpLink({
      uri: 'http://opa.cl:4000/graphql',
      credentials: 'same-origin'
    })
  ]),
  cache: new InMemoryCache()
});

const theme = {
  ...DefaultTheme,
  dark: false,
  mode: 'adaptive',
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#57457F',
    accent: '#B3FFFD',
    background: '#F6F6F6',
    surface: '#FFFFFF',
    text: '#584A64',
    disabled: '#F6F6F6',
    placeholder: '#803EB9',
    //backdrop: '#584A64',
  },
  /*fonts: {
    regular: Font.loadAsync({'niramit-regular': require('./assets/fonts/Niramit-Regular.ttf')}),
    medium: Font.loadAsync({'niramit-medium': require('./assets/fonts/Niramit-Medium.ttf')}),
    light: Font.loadAsync({'niramit-light': require('./assets/fonts/Niramit-Light.ttf')}),
    thin: Font.loadAsync({'niramit-light': require('./assets/fonts/Niramit-Light.ttf')}),
  }*/
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    }
  }


  async componentDidMount() {
    await Font.loadAsync({
      'niramit-regular': require('./assets/fonts/niramit/Niramit-Regular.ttf'),
      'niramit-medium': require('./assets/fonts/niramit/Niramit-Medium.ttf'),
      'niramit-light': require('./assets/fonts/niramit/Niramit-Light.ttf'),
      'niramit-italic': require('./assets/fonts/niramit/Niramit-Italic.ttf'),
      'niramit-bold': require('./assets/fonts/niramit/Niramit-Bold.ttf'),
      'niramit-semibold': require('./assets/fonts/niramit/Niramit-SemiBold.ttf'),
      'nunito-regular': require('./assets/fonts/nunito/Nunito-Regular.ttf'),
      'nunito-bold': require('./assets/fonts/nunito/Nunito-Bold.ttf'),
      'nunito-black': require('./assets/fonts/nunito/Nunito-Black.ttf'),
      'source-sans-pro-regular': require('./assets/fonts/Source_Sans_Pro/SourceSansPro-Regular.ttf'),
      'source-sans-pro-bold': require('./assets/fonts/Source_Sans_Pro/SourceSansPro-Bold.ttf')
    });
    this.setState({ isReady: true });
  }


  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <ApolloProvider client={client}>
        <Provider store={createStore(Reducers)}>
          <PaperProvider theme={theme}>
            <AppSwitchNavigator/>
          </PaperProvider>
        </Provider>
      </ApolloProvider>
    );
     	
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
