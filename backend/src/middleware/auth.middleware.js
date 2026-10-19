const jwt = require('jsonwebtoken')
const blacklisttokenmodel = require('../model/blacklist.model')

async function authUser(req, res, next) {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({
                message: 'authentication required'
            })
        }

        const isblacklisted = await blacklisttokenmodel.findOne({ token })

        if (isblacklisted) {
            return res.status(401).json({
                message: 'invalid token'
            })
        }

        const decode = jwt.verify(token, process.env.jwt_secret)

        req.user = decode

        next()

    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'invalid or expired token'
            })
        }

        console.log(error)

        return res.status(500).json({
            message: 'internal server error'
        })
    }
}

module.exports = { authUser, getmemiddleware: authUser }
