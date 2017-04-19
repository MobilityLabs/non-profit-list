import express from 'express'
import query from '../queries'

const router = express.Router()

// View a single persona
router.get('/organizations', query.getOrganizations)

module.exports = router;