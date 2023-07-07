const UserStats = require('../models/UserStats')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/costom-error')

const getAllUserStats = asyncWrapper(async (req, res) => {
    const userStats = await UserStats.find({})
    res.status(200).json({ userStats })
})

const createUserStats = asyncWrapper(async (req, res) => {
    const userStats = await UserStats.create(req.body)
    res.status(201).json({ userStats })
})

const getUserStats = asyncWrapper(async (req, res, next) => {
    const { id: userID } = req.params
    const userStats = await UserStats.findOne({ userId: userID })
    if (!userStats) {
        return next(createCustomError(`No user with id : ${userID}`, 404))
    }

    res.status(200).json({ userStats })
})

const updateUserStats = asyncWrapper(async (req, res, next) => {
    const { id: userID } = req.params

    const userStats = await UserStats.findOneAndUpdate({ userId: userID }, req.body, {
        new: true,
        runValidators: true,
    })

    if (!userStats) {
        return next(createCustomError(`No user with id : ${userID}`, 404))
    }

    res.status(200).json({ userStats })
})

module.exports = {
    getAllUserStats,
    createUserStats,
    getUserStats,
    updateUserStats,
}