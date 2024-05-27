const { checkJWT } = require("../helpers/jwt")
const { userConnected, userDisconnected, getUsers } = require("../controllers/socket")

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async ( socket ) => {
            
            // user connected 
            const token = socket.handshake.query["x-token"]
            const uid = checkJWT( token )
            
            if( !uid ){
                return socket.disconnect()
            }

            await userConnected( uid )

            // Emit all connected users  
            this.io.emit( "list-users", await getUsers( uid ) )


            // user disconnected 
            socket.on( "disconnect", async () => {
                await userDisconnected( uid )
                this.io.emit( "list-users", await getUsers() )
            } ) 
        });
    }
}

module.exports = Sockets;