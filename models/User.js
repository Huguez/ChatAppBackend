const { Schema, model } = require("mongoose")

const User = Schema({
   nickname: {
      type: Schema.Types.String,
      required: true
   },
   email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
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
      type: Schema.Types.String,
      enum: ['active', 'banned', 'unverified'],
      required: false,
      default: 'active', //unverified
   },
}, { 
   timestamps: true,
} )

User.method( "toJSON", function( doc, ret ){
   const { __v, _id, password, ...obj } = this.toObject()
   obj.uid = _id
   return obj
} )

module.exports = model( "User", User )