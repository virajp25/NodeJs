const express = require('express');
const bodyparser = require('body-parser');
const userRouter = require('./router/user.router')
const similarS3Router = require('./router/similartos3.route')

const app = express();
app.use(bodyparser.json());

app.use('/',userRouter)
app.use('/',similarS3Router)


module.exports = app;