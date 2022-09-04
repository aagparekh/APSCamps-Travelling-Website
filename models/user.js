const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user1: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    pass1: { type: String, required: true },
    phoneno: { type: String, required: true, unique: true }
},
    { collection: 'users' }
)

const model = mongoose.model('userSchema', userSchema)

module.exports = model