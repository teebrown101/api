const mongoose = require('mongoose');

//const URI = process.env.MONGO_URL;


const connectDB = (URI) => {
    return mongoose.connect(URI, {
        useNewUrlParser: true,
        //useCreateIndex: true,
        //useFindAndModify: false,
        useUnifiedTopology: true,
    })
}

module.exports = connectDB