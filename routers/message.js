const { Router } = require("express")
const { getChatbyUser } = require("../controllers/message")

const validateJWT = require("../middleware/validateJWT")
const { param } = require("express-validator")
const validateFields = require("../middleware/validateFields")

const router = Router()

// router.use(  )

router.get( "/chatByUser/:to", [
   param( "to", "Is not a valid ID" ).isMongoId(),
   validateJWT,
   validateFields,
], getChatbyUser )


module.exports = router