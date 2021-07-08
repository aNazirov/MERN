const express = require('express')
const controller = require('../controllers/auth')
const router = express.Router()


//localhost:5500/api/auth/login
//localhost:5500/api/auth/login.php
router.post('/login', controller.login)

router.post('/register', controller.register)

module.exports = router
