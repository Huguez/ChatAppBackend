const { ObjectId } = require("mongoose").Types
const User = require("../models/User")
const Message = require("../models/Message")


const userConnected =  async ( uid ) => {
   try {
      const user = await User.findById( uid )
      user.online = true
      await user.save()

      return user;
   } catch ( error ) {
      console.log( error );
   }
}


const userDisconnected =  async ( uid ) => {
   try {
      const user = await User.findById( uid )
      user.online = false
      await user.save()

      return user;
   } catch ( error ) {
      console.log( error );
   }
}

const getUsers = async () => {
   try {
      const allUsers = await User.find( {} ).sort( { online: "desc" } )
      
      return allUsers
   }catch( error ){
      console.log( error );
      return []
   }
}

const saveMsg = async ( payload ) => {
   try {

      const { to, from, msg } = payload
      
      const newMsg = new Message( { 
         message: msg,
         from: ObjectId.createFromHexString( from ),
         to: ObjectId.createFromHexString( to ), 
      } )

      await newMsg.save()
      
      return newMsg
   } catch (error) {
      console.log( error );
      return false
   }
}


module.exports = {
   userConnected,
   userDisconnected,
   getUsers,
   saveMsg,
}
