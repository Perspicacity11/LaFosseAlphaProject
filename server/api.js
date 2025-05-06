const express = require('express');
const cors = require('cors');
const logger = require('./logger');
const path = require('path')

const userRouter = require('./routes/user_routes');
const sessionRouter = require('./routes/session_routes');

const app = express()

app.use(cors({
  origin: ['https://geo-nius.netlify.app/'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger)
app.use('/users', userRouter);
app.use('/sessions', sessionRouter);

app.use(express.static(path.join(__dirname, "../client/build")))

// app.get("/", (req, res) => {
//   res.status(200).json({
//     title: "Geo-nius",
//     description: "Geography games and quizzes to make learning fun!",
//   })
// })

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/login.html'));
});

module.exports = app;
