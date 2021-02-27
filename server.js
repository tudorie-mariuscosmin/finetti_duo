const express = require('express')
const appConfig = require('./config/app.conf.json')
const bodyParser = require('body-parser')
const routes = require('./routes')


const app = express()

app.use(bodyParser.json())

app.use('/api', routes)



const PORT = appConfig.port || 8080
app.listen(PORT, () => { console.log(`Server lisening on port ${PORT}`) })