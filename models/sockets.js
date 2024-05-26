const { checkJWT } = require("../helpers/jwt")
const { userConnected, userDisconnected } = require("../controllers/socket")

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async ( socket ) => {
            
            const token = socket.handshake.query["x-token"]
            const uid = checkJWT( token )
            
            if( !uid ){
                return socket.disconnect()
            }

            await userConnected( uid )

            socket.on( "disconnect", async () => {
                await userDisconnected( uid )
            } ) 
        });
    }
}

module.exports = Sockets;