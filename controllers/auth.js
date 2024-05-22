
const login = async ( req, res ) => {
   try {
      const { email, password } = req.body


      return res.status( 200 ).json( {
         ok: true,
         msg: "login controller ",
         wawa: { email, password }
      } )
   } catch ( error ) {
      console.log( error );
      return res.status( 500 ).json( {
         ok: false,
         msg: "Error - login",
      } )
   }
}


const register = async ( req, res ) => {
   try {
      const { email, password } = req.body


      return res.status( 200 ).json( {
         ok: true,
         msg: "register controller ",
         wawa: { email, password }
      } )
   } catch ( error ) {
      console.log( error );
      return res.status( 500 ).json( {
         ok: false,
         msg: "Error - register",
      } )
   }
}

const renew = async ( req, res ) => {
   try {
      const { email, password } = req.body


      return res.status( 200 ).json( {
         ok: true,
         msg: "renew controller ",
         body: {
            email, password
         }
      } )
   } catch ( error ) {
      console.log( error );
      return res.status( 500 ).json( {
         ok: false,
         msg: "Error - renew",
      } )
   }
}

module.exports = {
   login,
   register,
   renew,
}