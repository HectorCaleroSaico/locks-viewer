const { Router } = require('express')
const { getLocksData, killLock, getInterval } = require('../controllers/lock.controller')
const {verficationSession } = require('../middleware/verificationSession')

const router = Router()

router.get('/', verficationSession, getLocksData)
router.get('/interval', verficationSession, getInterval)
router.post('/kill', verficationSession, killLock)


module.exports = router