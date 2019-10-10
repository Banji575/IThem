const {
    Pool
} = require('pg')

class connectDatabase{
    constructor(connectParams){
        this.pool = new Pool(connectParams)
    }
     async connectDb(query, params){
        const db = await this.pool.connect()
        const data = await db.query(query, params)
        db.end()
        return data.rows
    }
}
const dataBase = new connectDatabase({
    user: 'postgres',
    host: 'localhost',
    database: 'mypetapp',
    password: '1234',
    port: 5432,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
})

module.exports = dataBase