// require mongoose 
const mongoose = require('mongoose')
// creating shorthand for the Schema constructor 
const { Schema } = mongoose 

// schema
const breadSchema = new Schema({
    name: { type: String, required: true },
    hasGluten: { type: Boolean},
    image: { type: String, default: 'http://placehold.it/500x500.png' },
    baker: {
        type: String,
        enum: ['Rachel', 'Montica', 'Joey', 'Chandler', 'Ross', 'Pheobe']
    }
})

// model and export 
const Bread = mongoose.model('Bread', breadSchema)
module.exports = Bread
