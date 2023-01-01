const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const auth = require('./middleware/auth')

const ideasRouter = require('./routers/ideas')
const usersRouter = require('./routers/users')
const statOpsRouter = require('./routers/statOps')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.use(express.json())
app.use(ideasRouter)
app.use(usersRouter)
app.use(statOpsRouter)


app.get('/verify', auth, async (req, res) => {
    try {
        res.status(200).send({
            message: 'verified',
            username: req.user.username
        })
    } catch (e) {
        res.status(500).send({
            message: e
        })
    }

})

const port = process.env.PORT || 8081
app.listen(port)
console.log('server is up on port', port)