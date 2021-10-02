import { ApolloClient, InMemoryCache } from '@apollo/client'

let uri = 'http://localhost:4000/'

const client = new ApolloClient({
    connectToDevTools: true,
    uri,
    cache: new InMemoryCache()
});

export default client;