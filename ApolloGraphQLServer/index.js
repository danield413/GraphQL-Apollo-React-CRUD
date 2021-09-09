const { ApolloServer } = require('apollo-server');
const typeDefs = require('./database/schema');
const resolvers = require('./database/resolvers');
const conectarBaseDatos = require('./config');

//Conexión a MongoDB Atlas
conectarBaseDatos();

//Servidor de Apollo
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
});

//Arrancar el servidor de Apollo
server.listen().then( ({url}) => {
    console.log(`Servidor listo en la URL ${url}`);
})