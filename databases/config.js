const { default: mongoose } = require("mongoose");

const dbConnection = async () => {
   try {
      const { MONGODB_HOST, DATABASE, ADMIN, PASSWORD, MONGODB_PORT } = process.env

      const cnn = `mongodb://${ ADMIN }:${ PASSWORD }@${ MONGODB_HOST }:${ MONGODB_PORT }/${ DATABASE }`

      await mongoose.connect( cnn, {} )

      console.log( "DB Connect !!!" );

   } catch ( error ) {
      console.log( error );
      throw new Error( "Database connection fail!!" )
   }
}

module.exports = dbConnection