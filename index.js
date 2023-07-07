const express = require('express');
const app = express();

const users = require('./routes/users');
const userStats = require('./routes/userstats');
const userInfo = require('./routes/userInfo');
const Logs = require('./routes/logs');
const fbSocialLoginRoutes = require('./routes/fbSocialLogin');
//const fbDataDeletionstatus = require('./routes/fbDataDeletionstatus');


// importing for MD5 hash 
const hash = require ('object-hash');

const connectDB = require('./db/connect');

require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
//const userinfo = require('./models/UserInfo');


// middleware

app.use(express.static('./public'));
app.use(express.json()); // standard way body parser

//routes

app.use('/api/v1/users', users);
app.use('/api/v1/userInfo', userInfo);
app.use('/api/v1/userStats', userStats);
app.use('/api/v1/logs', Logs);
app.use('/api/v1/fblogin',fbSocialLoginRoutes);

app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT ||5000;


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();