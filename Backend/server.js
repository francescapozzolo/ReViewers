require('dotenv').config()

const express = require('express')
const cors = require ('cors')
const router = require ('./routes/index')
require('./config/passport')
require('./config/database')

const App = express()
App.use(cors())
App.use(express.json())

App.use("/api", router)

App.listen(4000, () => console.log("App listening on port 4000"))
