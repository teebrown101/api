const { string } = require("joi");
const mongoose = require("mongoose");

const FbloginSchema = new mongoose.Schema({

   user_Id:{
        type:String
    },
    email:{
        type:String
    },
  /*   expirational_timestamp:{
        type:String
    },
    last_refresh:{
        typer:String
    }
 */
});

module.exports = mongoose.model("FbLogin",FbloginSchema);