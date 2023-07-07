const UserInfo = require('../models/UserInfo')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/costom-error')
const userinfo = require('../models/UserInfo')

// to get all userInfo

const getAllUserInfo = asyncWrapper(async (req, res) => {
    const userInfo = await UserInfo.find({})
    res.status(200).json({ UserInfo })
})

// to create userInfo 
const createUserInfo = asyncWrapper(async (req, res) => {
    const userInfo = await UserInfo.create(req.body)
    const ip = req.socket.remoteAddress
    res.status(201).json({ userInfo })
})

// to get userInfo by id 
const getUserInfo = asyncWrapper(async (req, res, next) => {
    const { id: userID } = req.params
    const userInfo = await UserInfo.findOne({ _id: userID })
    if (!userInfo) {
        return next(createCustomError(`No user with id : ${userID}`, 404))
    }

    res.status(200).json({ userInfo })
})

//to update userInfo

const updateUserInfo = asyncWrapper(async (req, res, next) => {
    const { id: userID } = req.params

    const userInfo = await userinfo.findOneAndUpdate({ _id: userID }, req.body, {
        new: true,
        runValidators: true,
    })

    if (!userInfo) {
        return next(createCustomError(`No user with id : ${userID}`, 404))
    }

    res.status(200).json({ userInfo })
})

module.exports = {
    getAllUserInfo,
    createUserInfo,
    getUserInfo,
    updateUserInfo,
} 
