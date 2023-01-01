const express = require('express')
const arrangeNumbers = require('../calcAvgs')
const knex = require('../db/knex')

const router = new express.Router()

router.get('/trUniData', async (req, res) => {
    try {
        const trUnis = await knex('tr_unis').select().orderBy('id', 'asc')

        res.send(trUnis)

    } catch (e) {
        res.status(404).send(e)
    }

    
})

router.get('/trUniData/:valueName', async (req, res) => {
    const { valueName } = req.params

    let found = await knex('tr_unis').select()
        .where({value: valueName})
    
    found = found[0]
    
    if (!found) {
        res.status(200).send('not found')
    }

    res.status(200).send({
        name: found.value,
        avatar: found.avatar,
        city: found.city,
        type: found.type,
        logo: found.logo,

        reviews: found.reviews
    })
})

router.get('/reviews', async (req, res) => {

    try {
        const reviews = await knex('reviews').select()

        res.send(reviews)
    } catch (e) {
        res.status(404).send(e)
    }
})

router.post('/vote/:uniName', async (req, res) => {
    const voted = req.body.value
    
    let newReviews

    const votedUni = await knex('tr_unis')
        .where({value: req.params.uniName})

    arrangeNumbers(votedUni, voted)

    await knex('tr_unis').where({value: req.params.uniName}).update({
        reviews: votedUni[0].reviews
    })

    newReviews = await knex('tr_unis').where({value: votedUni[0].value})

    res.send(newReviews[0].reviews)
})

module.exports = router