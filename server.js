const express = require('express')
const appConfig = require('./config/app.conf.json')
const app = express()





const PORT = appConfig.port || 8080
app.listen(PORT, () => { console.log(`Server lisening on port ${PORT}`) })