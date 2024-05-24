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
      } ).limit( 30 ).sort( { createdAt: "desc" } )
      // 664fe25eb3fccb335c817df5
      return res.status( 200 ).json( {
         ok: true,
         toID,
         myID,
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