//imports
const User = require('../models/Logs')
const asyncWrapper = require('../middleware/async')
//const { createCustomError } = require('../errors/costom-error');
const Log = require('../models/Logs');
const { log } = require('console');


// create a new log entry 

const createlogs = asyncWrapper(async (req, res) =>{
    const logsData = req.body;
    const log = new Log(logsData);
    await log.save();
    return res.status(201).json({ log });
    
}); 

//get all log entries 

const getAlllogs = asyncWrapper(async(req,res)=>{
    log.find()
      .then((logs)=>{
        res.json(logs);
      })
      .catch((error)=>{
        res.status(500).json({error:'Failed to retrieve log entries'});

      });
    
}); 

//get log entries by ID

const getlogs = asyncWrapper(async(req,res)=>{
    const logId=req.params.id;
    Log.findById(logId)

    .then((log)=>{
        if(log){
            res.json(log);
        }else{
            res.status(404).json({ error: 'Log entry not found' });
        }
      })
  
      .catch((error) => {
        res.status(500).json({ error: 'Failed to retrieve log entry' });
      });
}); 

//update a log entry by ID 

const updatelogs = asyncWrapper(async(req,res)=>{
    const logId = req.params.id;
    const logsData=req.body;

    Log.findByIdAndUpdate(logId,logData,{new:true})
      .then((log) => {
        if (log) {
          res.json(log);
        } else {
          res.status(404).json({ error: 'Log entry not found' });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to update log entry' });
      });
})

module.exports = {
    getAlllogs,
    createlogs,
    getlogs,
    updatelogs,
}
