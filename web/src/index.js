import React from 'react';
import ReactDOM from 'react-dom';
import { WebSocketLink } from '@apollo/client/link/ws';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';

import App from './App';

const link = new WebSocketLink({
  uri: `ws://localhost:1401/graphql`,
  options: {
    reconnect: true
  }
});

const client = new ApolloClient({
  link,
  uri: 'http://localhost:1401/',
  cache: new InMemoryCache()
});



ReactDOM.render(
    <ApolloProvider client={client}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ApolloProvider>,
  document.getElementById('root')
);

