const { Router } = require('express')
const { getLocksData, killLock } = require('../controllers/lock.controller')
const {verficationSession } = require('../middleware/verificationSession')

const router = Router()

router.get('/', verficationSession, getLocksData)

router.post('/kill', verficationSession, killLock)

module.exports = router