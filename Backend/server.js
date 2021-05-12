const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('./config/database')
const router = require('./routes/Index')
const App = express()

App.use(cors())
App.use(express.json())

App.use("/api", router)

App.listen(4000, () => console.log("App listening on port 4000"))
