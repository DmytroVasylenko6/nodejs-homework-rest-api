const jwt = require('jsonwebtoken')
const { User } = require('../db/userModel')
const { NotAuthorizedError } = require('../helpers/errors')

const authMiddleware = async (req, res, next) => {
   try {
    if (req.headers['authorization'] === undefined ) {
        next(new NotAuthorizedError('Not authorized'))
        return
    }
    const [tokenType, token] = req.headers['authorization'].split(' ')
    
    if (!token) {
        next(new NotAuthorizedError('Please, provide a token'))
    }

 
        const currentUser = jwt.decode(token, process.env.JWT_SECRET)
        const user = await User.findById(currentUser._id)
        if (user.token === token) {
            req.user = user
        } else {
            next(new NotAuthorizedError('Invalid token'))
        }
        next()
    } catch {
        next(new NotAuthorizedError('Invalid token'))
    }

}

module.exports = {
     authMiddleware
}