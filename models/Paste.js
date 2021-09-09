const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PasteSchema = new Schema({
    url:{
        type: String,
        required: true
    },
    code:{
        type: String,
        required: true
    }

})
const paste = mongoose.model('paste', PasteSchema)
module.exports = paste