const express = require('express');

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const mainRoute = require('./routers/main')
const loginRoute = require('./routers/login')



const port = 4000;

const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/', mainRoute)
app.use('/login', loginRoute)




app.listen(port, () => console.log(`Run server on port ${port}`))