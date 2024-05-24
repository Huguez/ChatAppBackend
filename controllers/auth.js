const bcrytpjs = require("bcryptjs")
const User = require("../models/User")
const { generateJWT } = require("../helpers/jwt")

const salt = bcrytpjs.genSaltSync()

const login = async ( req, res ) => {
   try {
      const { email, password } = req.body

      const user = await User.findOne( { email } )
      if ( !user ) {
         return res.status( 404 ).json( {
            ok: false,
            msg: `E-mail ${ email } is NOT registered`,
         } )
      }

      const samePwd =  bcrytpjs.compareSync( password, user.password )
      if ( !samePwd ){
         return res.status( 400 ).json( {
            ok: false,
            msg: `Incorrect password`,
         } )
      }
      
      const token = await generateJWT( user._id )

      return res.status( 200 ).json( {
         ok: true,
         user,
         token,
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
      const { nickname, email, password } = req.body

      const thereIs = await User.findOne( { email } )
      if ( thereIs ) {
         return res.status( 400 ).json( {
            ok: false,
            msg: `E-mail ${ email } is already registered`,
         } )
      }

      const newUser = new User( { nickname, email, password } )

      newUser.password = bcrytpjs.hashSync( password, salt )

      const user = await newUser.save()

      const token = await generateJWT( user._id )
      
      return res.status( 200 ).json( {
         ok: true,
         user,
         token
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
      const uid = req.uid
      
      const user = await User.findOne( { _id: uid } )
      
      if ( !user ) {
         return res.status( 404 ).json( {
            ok: false,
            msg: `user Not Found`,
         } )
      }

      const token = await generateJWT( uid )

      return res.status( 200 ).json( {
         ok: true,
         token,
         user
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