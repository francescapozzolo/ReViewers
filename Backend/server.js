require('dotenv').config()

const express = require('express')
// const bodyParser = require('body-parser');
const cors = require ('cors')
const router = require ('./routes/index')
require('./config/passport')
require('./config/database')
const app = express()
app.use(cors())


// App.use(bodyParser.urlencoded({extended:false}));
// App.use(bodyParser.json())

// App.use('/public', express.static(`${__dirname}/storage/imgs`))



app.use(express.json())

app.use("/api", router)

app.listen(4000, () => console.log("App listening on port 4000"))
