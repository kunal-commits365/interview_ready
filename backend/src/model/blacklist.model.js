const mongoose = require('mongoose')

const blacklisttokenscema = new mongoose.Schema({
    token: {
        type:String,
        required:[true,"token is required"]
    }
},{
    timestamps:true
})

const blacklisttokenmodel = mongoose.model('blaclisttoken',blacklisttokenscema)

module.exports = blacklisttokenmodel