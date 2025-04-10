// backend/routes/linkRoutes.js
const express = require('express');
const { createShortLink, getLink } = require('../controllers/linkController');

const router = express.Router();

router.post('/shorten', createShortLink);
router.get('/:slug', getLink);

module.exports = router;
