require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser');
const cors = require ('cors')
const router = require ('./routes/index')
require('./config/passport')
require('./config/database')
const App = express()
App.use(cors())


App.use(bodyParser.urlencoded({extended:false}));
App.use(bodyParser.json())

App.use('/public', express.static(`${__dirname}/storage/imgs`))


// App.use(express.json())

App.use("/api", router)

App.listen(4000, () => console.log("App listening on port 4000"))
