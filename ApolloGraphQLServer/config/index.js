const mongoose = require('mongoose');
require('dotenv').config({ path: 'vars.env'});

//Conectar 
const conectarBaseDatos = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('DB Conectada');
    } catch (error) {
        console.log(error);
        console.log('Hubo un error');
        process.exit(1); // detener la app
    }
}

module.exports = conectarBaseDatos;