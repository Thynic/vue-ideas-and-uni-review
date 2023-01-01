const { Client } = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: "5432",
    password: "4528",
    database: "ideas"
})

module.exports = client
