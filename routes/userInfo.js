const express = require('express')
const router = express.Router()

const {
    getAllUserInfo,
    createUserInfo,
    getUserInfo,
    updateUserInfo,
} = require('../controllers/userInfo')

router.route('/').get(getAllUserInfo).post(createUserInfo)
router.route('/:id').get(getUserInfo).patch(updateUserInfo)

module.exports = router 