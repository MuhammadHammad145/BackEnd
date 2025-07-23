const mongoose = require("mongoose")
require("dotenv").config()

const { MONGOOSE_USERNAME, MONGOOSE_PASSWORD } = process.env
const connectDb = () => {
    mongoose.connect(`mongodb+srv://${MONGOOSE_USERNAME}:${MONGOOSE_PASSWORD}@cluster0.l2r4zra.mongodb.net/`)
        .then(() => {
        console.log('mongo db connected success fully')
    }).catch((error)=>{
        console.log('Something went wrong while connecting mongo db',error)
    })
}

module.exports=connectDb
