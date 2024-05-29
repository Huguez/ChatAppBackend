const Message = require("../models/Message")

const getChatbyUser = async ( req, res ) => {
   try {
      const myID = req.uid
      const { to:toID } = req.params
      
      const chat = await Message.find( {
         $or: [
            { from: myID, to: toID },
            { from: toID, to: myID },
         ]
      } ).limit( 100 ).sort( { createdAt: "asc" } )
      
      return res.status( 200 ).json( {
         ok: true,
         chat,
      } )

   } catch (error) {
      console.log( error );
      return res.status( 500 ).json( {
         ok: false,
         msg: "Error - getChatbyUser"
      } )
   }
}

module.exports = {
   getChatbyUser,
}