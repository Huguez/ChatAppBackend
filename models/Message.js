const { Schema, model } = require("mongoose")

const Message = Schema( {
   message: {
      type: Schema.Types.String,
      required: true,
   },
   to: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
   },
   from: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
   }
}, { 
   timestamps: true
 } );


Message.method( "toJSON", function(){
   const { __v, _id, ...obj } = this.toObject()
   obj.id = _id
   return obj
} )

module.exports = model( "Message", Message )