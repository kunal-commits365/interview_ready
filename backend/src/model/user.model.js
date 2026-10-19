const mongoose = require('mongoose')

const userscema = new mongoose.Schema({
    username: {
        type:String,
        unique:[true,'username already exist'],
        required:true
    },
    email: {
        type:String,
        unique:[true,'email already exist'],
        required:true
    },

    password: {
        type:String,
        required:true

    }
})

const usermodule = mongoose.model("user",userscema)

module.exports = usermodule;