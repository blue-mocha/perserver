import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache,ApolloProvider, HttpLink} from "@apollo/client";
import App from './App';

const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_SERVER_URL}/graphql`, 
  credentials: 'include' 
});

const client = new ApolloClient({
  link : httpLink,
  cache: new InMemoryCache(),
});

//console.log(client.cache)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);//

root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
  </BrowserRouter>
);




