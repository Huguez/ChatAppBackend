// Servidor de Express
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');
const cors     = require("cors")

const Sockets  = require('./sockets');
const dbConnection = require('../databases/config');

const authPath = require( "../routers/auth" )
const messagePath = require( "../routers/message" )

class Server {

    constructor() {

        this.app  = express();
        this.port = process.env.PORT;

        // Connect DB
        dbConnection()

        // Http server
        this.server = http.createServer( this.app );
        
        // Configuraciones de sockets
        this.io = socketio( this.server, { /* configuraciones */ } );
    }

    #routes(){
        this.app.use( "/message", messagePath )
        this.app.use( "/auth", authPath )
    }

    middlewares() {
        // Desplegar el directorio público
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );

        //cors
        this.app.use( cors() );

        //parse json
        this.app.use( express.json() );
    }

    // Esta configuración se puede tener aquí o como propieda de clase
    // depende mucho de lo que necesites
    configurarSockets() {
        new Sockets( this.io );
    }

    execute() {

        // Inicializar Middlewares
        this.middlewares();
        
        // set routes
        this.#routes()

        // Inicializar sockets
        this.configurarSockets();

        // Inicializar Server
        this.server.listen( this.port, () => {
            console.log(`Server running on http://localhost:${ this.port }` );
        });
    }

}


module.exports = Server;