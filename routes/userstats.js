const express = require('express')
const router = express.Router()

const {
  getAllUserStats,
  createUserStats,
  getUserStats,
  updateUserStats,
} = require('../controllers/userstats')

router.route('/').get(getAllUserStats).post(createUserStats)
router.route('/:id').get(getUserStats).patch(updateUserStats)

module.exports = router