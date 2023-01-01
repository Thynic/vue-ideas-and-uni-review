const knex = require('knex')({
    client: 'pg',
    connection: {
        host : 'localhost',
        port : 5432,
        user : 'postgres',
        password : '4528',
        database : 'ideas'
      }
})

module.exports = knex