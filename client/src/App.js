import AppRouter from "./router/Router";
import { HelmetProvider } from 'react-helmet-async';
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";
import 'animate.css';

function App() {
  return (
    <ApolloProvider client={ client }>
      <HelmetProvider>
        <AppRouter>  
        </AppRouter>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
