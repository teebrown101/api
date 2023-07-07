const FbLogin = require("../models/Fblogin");
const asyncWrapper = require('../middleware/async');
const { createcustomError } = require('../errors/costom-error');
require('dotenv').config();

// for deleteing the fblogindata 


// to create fbdata 

const createfbdata = asyncWrapper(async (req, res) => {
    const { user_Id } = req.body;
    const tempUser = await FbLogin.find({"user_Id":user_Id});
    if(tempUser.length>0){
        return res.status(401).json({"message":"User already exists", "user":tempUser});
    }
    const Createfbdata = await FbLogin.create(req.body)
    // const ip = req.socket.remoteAddress
    res.status(201).json({ Createfbdata })
})


// fb data deletion api 

const deletefbdata = asyncWrapper(async (req, res) => {

    // checking what is coming in req.body 
    console.log("deletefbdata- req.body:", req.body);

    // user_id from req.body
    const { user_Id } = req.body;

    // delete from the db 
    const tempFbsociallogin = await FbLogin.deleteOne({ "user_Id": user_Id });

    // lets check data deletd or not :
    if (tempFbsociallogin.deletedCount == 0) {
        return res.status(401).json({ "message ": "user doesn't exist", "deleteStatus": tempFbsociallogin});
    }

    let tempSucessurl = `${process.env.SERVER_URL}/api/v1/fblogin/get?id=${user_Id}`;


    //response 

    res.status(200).json({
        url: tempSucessurl,
        confirmation_code: 'ok'
    })


});

// deletion status check api 

const deletionsocialLoginstatus = asyncWrapper(async (req, res) => {


    const user_Id = req.query.id;


    const tempFbsociallogin = await FbLogin.find({ "user_Id": user_Id });

    console.log(tempFbsociallogin);

    if (tempFbsociallogin.length > 0) {
        return res.status(409).json({
            "message": "userexist",
            "user": tempFbsociallogin
        })
    }

    res.status(200).json({ "message": "user not found" });

})




module.exports = { deletefbdata, createfbdata, deletionsocialLoginstatus };