const express = require('express')
const router = express.Router()
const {
    getAlllogs,
    createlogs,
    getlogs,
    updatelogs,
} = require('../controllers/logs')

router.route('/')
    .get(getAlllogs)
    .post(createlogs);

router.route('/:id')
    .get(getlogs)
    .put(updatelogs)

module.exports = router