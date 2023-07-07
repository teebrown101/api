//imports
const User = require('../models/User')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/costom-error')
const hash = require("object-hash");



// to get all users

const getAllUsers = asyncWrapper(async (req, res) => {

    const users = await User.find({})
    res.status(200).json({ users })
})

// to create user


const createUser = asyncWrapper(async (req, res) => {
    const {username,devicetype,osplatform,manufacturer,socialLogin,skinNfts,
    wallet,userType,activeclans,activeweapons,activeskins,networktype,
    walletAddress,lastLogin,createdAt,appversion,lastUpdate,gaidfa,
    ua,os} = req.body; 

    const user = new User({
        username,
        devicetype,
        osplatform,
        manufacturer,
        socialLogin,
        skinNfts,
        wallet,
        userType,
        activeclans,
        activeweapons,
        activeskins,
        networktype,
        walletAddress,
        lastLogin,
        createdAt,
        appversion,
        lastUpdate,
        gaidfa,
        ua,
        os
    })

    // created a client id by concating : 
    let cId=`${username}_${devicetype}_${osplatform}_${manufacturer}`

    //applying MD5 algorithm for hashing clientiD:
    let encryptedclientID = hash.MD5(cId);

    // to check user exit or not by client id :
    let tempUser = await User.find({clientId:encryptedclientID});
    if(tempUser.length != 0) {
        return res.status(409).json({"Message":"User already exist", "user":tempUser});
    }

    user.clientId = encryptedclientID;
    await user.save();
    const ip = req.socket.remoteAddress;
    res.status(201).json({ user })
})

// to get user by id 
const getUser = asyncWrapper(async (req, res, next) => {
    const { id: userID } = req.params
    const user = await User.findOne({ _id: userID })
    if (!user) {
        return next(createCustomError(`No user with id : ${userID}`, 404))
    }

    res.status(200).json({ user })
})

//to update user 

const updateUser = asyncWrapper(async (req, res, next) => {
    const { id: userID } = req.params

    const user = await User.findOneAndUpdate({ _id: userID }, req.body, {
        new: true,
        runValidators: true,
    })

    if (!user) {
        return next(createCustomError(`No user with id : ${userID}`, 404))
    }

    res.status(200).json({ user })
})

module.exports = {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
}
