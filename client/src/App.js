import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

// Component Imports
import Header from './components/Header';
import Footer from './components/Footer';

// Page Imports
import Home from './pages/Home';

// Application
function App() {

  const httpLink = createHttpLink({
    uri: '/graphql',
  });
  
  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div>
        <Header />
        <div>
            <Home />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
