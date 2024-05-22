const { validationResult } = require("express-validator")

const validateFields = ( req, res, next ) => {
   try {
      const errores = validationResult( req )

      if ( !errores.isEmpty() ) {
         const erroresMap = errores.mapped()
         const errors = {}

         for (const err in erroresMap) {
            errors[err] = { msg: erroresMap[err].msg }
         }

         return res.status( 400 ).json( {
            ok: false,
            errors,
         } )
      }

      return next()
   } catch ( errors ) {
      console.log( errors );
      return {}
   }
}

module.exports = validateFields