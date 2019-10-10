const {
    Router
} = require('express')
const router = Router()
const auth = require('../moduls/authorized')
const connectDatabase = require('../moduls/connectDB')

router.post('/', async (req, res) => {
    const query = 'SELECT id FROM userslogin WHERE name = $1 AND password = $2'

    const {
        username,
        password
    } = req.body
    try {
        const data = await connectDatabase.connectDb(query, [username.toLowerCase(), password.toString()])
        if (data.length != 0) {
            const token = auth.createSign({
                id: data[0].id,
                username: username
            }, auth.secretKey)
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

module.exports = router

