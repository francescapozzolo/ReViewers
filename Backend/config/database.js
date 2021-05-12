const mongoose = require ('mongoose')

mongoose.connect("mongodb+srv://francescapozzolo:greta1165@cluster0.qwgly.mongodb.net/ReViewers?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify:false
})
.then(() => console.log("Data base connected"))
.catch((error) => console.log(error))