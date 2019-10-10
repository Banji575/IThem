const {
    Router
} = require('express')
const router = Router()
const auth = require('../moduls/authorized')
const connectDatabase = require('../moduls/connectDB')


router.get('/getPosts', auth.isAuthorized.bind(auth), async (req, res) => {
    const query = 'SELECT * FROM posts'
    const data = await connectDatabase.connectDb(query)
    res.send(data)
})
router.post('/sendPost', auth.isAuthorized.bind(auth), async (req, res) => {
    const query = 'INSERT INTO posts (title, date, author, body, tag) VALUES ($1,$2,$3,$4,$5)'
    const array = req.body
    array.forEach(async el => {
        const {
            title,
            data,
            author,
            body,
            tag
        } = el
        const connect = await connectDatabase.connectDb(query, [title, data, author, body, tag])
    })
})

router.post('/test', auth.isAuthorized.bind(auth).bind(auth), (req, res) => {
    console.log('test')
})

module.exports = router