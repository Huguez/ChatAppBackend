const { Schema, model } = require("mongoose")

const User = Schema({
   nickname: {
      type: Schema.Types.String,
      required: true
   },
   email: {
      type: Schema.Types.String,
      required: true,
      uniquie: true,
   },
   password: {
      type: Schema.Types.String,
      required: true
   },
   online: {
      type: Schema.Types.Boolean,
      default: false
   },
   status: {
      type: [ 'active', 'banned', 'unverified' ],
      required: false,
   },
}, { 
   timestamps: true
} )

User.method( "toJSON", function(){
   const { __v, _id, ...obj } = this.toObject()
   obj.uid = _id
   return obj
} )

module.exports = model( "User", User )