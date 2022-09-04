const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    user: String,
    place: String,
    price: String,
    category: String,
},
    { collection: 'trips' }
)

const model = mongoose.model('tripSchema', tripSchema)
module.exports = model