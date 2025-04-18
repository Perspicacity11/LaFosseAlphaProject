const express = require('express');
const cors = require('cors');
const logger = require('./logger');

const userRouter = require('./server/routes/user_routes');
const sessionRouter = require('./server/routes/session_routes');

const app = express()

app.use(express.json());
app.use(cors())
app.use(logger)
app.use('/users', userRouter);
app.use('/sessions', sessionRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    title: "Geo-nius",
    description: "Geography games and quizzes to make learning fun!",
  })
})

module.exports = app;
