import express from 'express'
import {getOrganizations, getSummary} from '../queries'

const router = express.Router()

// View a single persona
router.get('/organizations', getOrganizations)

router.get('/summary', getSummary)

module.exports = router
