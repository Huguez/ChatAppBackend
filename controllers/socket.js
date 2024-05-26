const User = require("../models/User")

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

module.exports = {
   userConnected,
   userDisconnected,
}
