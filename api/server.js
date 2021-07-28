const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const restricted = require('./middlewares/restricted');
const authRouter = require('./auth/auth-router');
const marketRouter = require('./market/market-router');

// const db = require('./data/db-config')

// function getAllUsers() { return db('users') }

// async function insertUser(user) {
//   // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
//   // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
//   // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
//   const [newUserObject] = await db('users').insert(user, ['user_id', 'user_name', 'password'])
//   return newUserObject // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
// }

const server = express()

server.use(express.json())
server.use(helmet())
server.use(cors())
server.use(cookieParser)


server.use('/api/auth', authRouter);
server.use('/api/market', restricted, marketRouter);

server.get('/', (req, res, next) => {
    res.json({
        api: 'up'
    })
    next()
});

server.use((err, req, res, next) =>  {
    res.status(err.status).json({
        message: err.message,
        stack: err.stack
    })
});

server.use('*', (req, res, next) => {
    res.status(404).json({
        message: 'Sorry, not found!'
    })
});

module.exports = server
