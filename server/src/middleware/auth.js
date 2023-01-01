const jwt = require('jsonwebtoken')

const knex = require('../db/knex')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'topsecretkey')
        const userData = decoded[Object.keys(decoded)[0]]
        
        const users = await knex('users').select()
        const user = users.find(user => user.id == userData.id)

        if (!user) {
            throw new Error()
        }

        req.user = user

        next()
    } catch (e) {
        res.status(401).send({message: 'unauthorized'})
    }
}

module.exports = auth