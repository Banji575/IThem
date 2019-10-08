const express = require('express');
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const {
    Pool
} = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mypetapp',
    password: '1234',
    port: 5432,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});

const port = 4000;
const secretKey = 'dSjkLsSjerIfkL'
const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

const connectDb = async (query, params) => {
    const db = await pool.connect()
    const data = await db.query(query, params)
    db.end()
    return data.rows
}

const createSign = (data, secretKey) => {
    return jwt.sign(data, secretKey)
}

const isAuthorized = (req, res, next) => {
    if (typeof req.headers.token !== "undefined") {
        const token = req.headers.token.split(' ')[1]
        jwt.verify(token, secretKey, {
            algorithms: 'HS256'
        }, (err, decoded) => {
            if (err) {
                res.status(500).json({
                    error: 'No authorized'
                })
            }
            next()
        })

    } else {
        console.log('No authorized')
    }
}

app.post('/', (req, res) => {
    res.send('ok')
})

app.post('/login', async (req, res) => {
    const query = 'SELECT id FROM userslogin WHERE name = $1 AND password = $2'

    const {
        username,
        password
    } = req.body
    try {
        const data = await connectDb(query, [username.toLowerCase(), password.toString()])
        if (data.length != 0) {
            const token = createSign({
                id: data[0].id,
                username: username
            }, secretKey)
            res.status(200)
            res.send({
                id: data[0].id,
                token: token
            })
        } else {
            res.status(401)
            res.send('No user or password')
        }
    } catch (error) {
        console.log(error)
    }
})

app.get('/', (req, res) => {

})
app.get('/getPosts', isAuthorized, async (req, res) => {
    const query = 'SELECT * FROM posts'
    const data = await connectDb(query)
    console.log(data)
    res.send(data)
})
app.post('/sendPost', isAuthorized, async (req, res) => {
    const query = 'INSERT INTO posts (title, date, author, body, tag) VALUES ($1,$2,$3,$4,$5)'
    const array = req.body
    array.forEach(async el=>{
        const {title, data, author, body, tag} = el
        const connect = await connectDb(query, [title,data, author, body, tag])
    })
})

app.post('/test', isAuthorized, (req, res) => {
})


app.listen(port, () => console.log(`Run server on port ${port}`))