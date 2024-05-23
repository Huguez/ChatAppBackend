const { default: mongoose } = require("mongoose");

const dbConnection = async () => {
   try {
      const { DATABASE, NODE_ENV, MONGODB_PORT, URI } = process.env

      const cnn = NODE_ENV === "development" ? `mongodb://localhost:${ MONGODB_PORT }/${ DATABASE }` : URI
      
      mongoose.connect( cnn, {} ).then( () => {
         console.log( "DB Connect !!!" );
      } ).catch( err => {
         console.log( err );
      } )

   } catch ( error ) {
      console.log( error );
      throw new Error( "Database connection fail!!" )
   }
}

module.exports = dbConnection