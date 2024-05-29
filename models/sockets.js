const { checkJWT } = require("../helpers/jwt")
const { userConnected, userDisconnected, getUsers, saveMsg } = require("../controllers/socket")

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

            socket.join( uid );




            // Emit all connected users  
            this.io.emit( "list-users", await getUsers( uid ) )

            // user sent message another

            // user received
            socket.on( "send-msg", async ( payload ) => {
                const msg = await saveMsg( payload )

                this.io.to( msg.from.toString() ).emit( "send-msg", msg )
                this.io.to( msg.to.toString() ).emit( "send-msg", msg )
            } )

            // user disconnected 
            socket.on( "disconnect", async () => {
                await userDisconnected( uid )
                this.io.emit( "list-users", await getUsers() )
            } ) 
        });
    }
}

module.exports = Sockets;