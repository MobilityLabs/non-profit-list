// @flow
import express from 'express';
import {getOrganizations} from '../queries';

const router = express.Router();

// View a single persona
router.get('/organizations', getOrganizations);

module.exports = router;
