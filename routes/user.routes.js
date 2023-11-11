const { Router, response } = require('express')
const { signInv2, signOff, refreshToken } = require('../controllers/user.controller')
const {verficationSession } = require('../middleware/verificationSession')

const router = Router()

router.post('/login', signInv2)

router.post('/signoff', verficationSession, signOff)

router.get('/token', refreshToken)

module.exports = router