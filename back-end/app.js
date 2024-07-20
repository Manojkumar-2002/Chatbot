const express = require('express');
const cors = require('cors');

const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const chatRouter = require('./controllers/chats');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/chat', chatRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
module.exports = app;
