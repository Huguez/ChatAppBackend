const { Router } = require("express")
const { login, register, renew } = require("../controllers/auth")
const { check } = require("express-validator")
const validateFields = require("../middleware/validateFields")

const router = Router()

router.post( "/login", [
   check( "email", "E-mail is required" ).not().isEmpty(),
   check( "email", "Must be a valid e-mail" ).isEmail(),
   check( "password", "Password is required" ).not().isEmpty(),
   check( "password", "Password is too short" ).isLength( { min: 3 } ),
   validateFields,
],  login )

router.post( "/register",[
   check( "nickname", "Nickname is required" ).not().isEmpty(),
   check( "email", "Must be a valid e-mail" ).isEmail(),
   check( "password", "Password is required" ).not().isEmpty(),
   check( "password", "Password is too short" ).isLength( { min: 3 } ),
   validateFields,
], register )

router.post( "/renew", renew )

module.exports = router