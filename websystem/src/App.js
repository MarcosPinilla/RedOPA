import React from 'react';
import './App.css';
import Routes from './routes/routes.js';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { deepPurple } from '@material-ui/core/colors';

import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, from, Observable } from 'apollo-link';
import { onError } from "apollo-link-error";

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducers from './rdx/reducers'; 

const opaTheme = createMuiTheme({
  palette: {
    primary: {
      main: deepPurple[700]
    },
    secondary: {
      main: '#B3FFFD'
    }
  },
  appBar: {
    height: 50,
  },
});


const request = async (operation) => {
  const token = localStorage.getItem('token')

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
    onError(({ response, operation }) => {
      if (operation.operationName === "IgnoreErrorsQuery") {
        response.errors = null;
      }
    }),
    requestLink,
    new HttpLink({
      uri: 'http://opa.cl:4000/graphql',
      credentials: 'same-origin'
    })
  ]),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={createStore(Reducers)}>
        <div className="App">
          <ThemeProvider theme={opaTheme}>
            <Routes />
          </ThemeProvider>
        </div>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
