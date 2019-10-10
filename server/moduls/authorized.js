class Authorized {
    constructor() {
        this.jwt = require('jsonwebtoken')
        this.secretKey = 'dSjkLsSjerIfkL'

    }
    createSign(data, secretKey) {
        return this.jwt.sign(data, secretKey)
    }
    isAuthorized(req, res, next) {
        if (typeof req.headers.token !== "undefined") {
            const token = req.headers.token.split(' ')[1]
            this.jwt.verify(token, this.secretKey, {
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
}

const auth = new Authorized
module.exports = auth