const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true  //mongoose проверяет уникальность почты
    },
    password: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model('users', userSchema)