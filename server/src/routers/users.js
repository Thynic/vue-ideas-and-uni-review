const express = require('express')
const auth = require('../middleware/auth')
const knex = require('../db/knex')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const router = new express.Router()

router.get('/users/me' , auth, async (req, res) => {
    res.send(req.user)
})

router.post('/users', async (req, res) => {

    const users = await knex('users').select()

    const isMatch = users.find(user => user.username == req.body.username)

    if (!isMatch) {
        const salt = await bcrypt.genSalt(8)
        // Hash password
        const password = await bcrypt.hash(req.body.password, salt)
    
        await knex('users').insert({
            username: req.body.username,
            password: password,
            tokens: []
        })

        const newUsers = await knex('users').select()

        const newUser = newUsers.find(user => user.username == req.body.username)

        jwt.sign({newUser}, 'topsecretkey', async (err, token) => {

            await knex('users').where({id: newUser.id}).update({
                tokens: [{
                    id: newUser.id,
                    token
                }]
            })

        })

        res.status(200).send('created a user')
    } else {
        res.status(200).send('username already exists')
    }
    
})

router.get('/users', async (req, res) => {
    const users = await knex('users').select()

    res.status(200).send(users)
})

router.post('/login', async (req, res) => {
    try {   
        const users = await knex('users').select()

        const user = users.find(user => user.username == req.body.username)
    
        if (user) {
            const verified = bcrypt.compareSync(req.body.password, user.password)
    
            if(verified) {
                // will send jwt token


                jwt.sign({user}, 'topsecretkey', async (err, token) => {

                    if (!(user.tokens.length > 2)) {
                        await knex('users').where({id: user.id}).update({
                            tokens: [...user.tokens, {
                                id: user.id,
                                token
                            }]
                        })
                    }

                })

                // const newUsers = await knex('users').select()

                // const newUser = newUsers.find(user => user.username == req.body.username)

                res.json({
                    status: 'login successful',
                    user,
                    token: user.tokens[user.tokens.length - 1].token
                })

            } else {
                res.status(200).send({
                    status: 'Password or username is wrong.'
                })
            }
        } else {
            res.status(200).send({
                status: 'Password or username is wrong.'
            })
        }
    } catch {
        res.status(500)
    }
})

module.exports = router