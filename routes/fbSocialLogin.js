const express = require('express');
const router = express.Router();

const {
    createfbdata,
    deletefbdata,
    deletionsocialLoginstatus,

} = require('../controllers/fbSocialLogin')

router.route('/create').post(createfbdata);
router.route('/delete').post(deletefbdata)
router.route('/get').get(deletionsocialLoginstatus)

    
module.exports = router;