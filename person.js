const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connection open')
    })
    .catch(err => {
        console.log('sorry thats an error')
        console.log(err)
    })


const personSchema = new mongoose.Schema({
    first: String,
    last: String
})

personSchema.virtual('fullName').get(function () {
    return `${this.first} ${this.last}`
})

personSchema.pre('save', async function () {

    console.log('about to save')

})
personSchema.post('save', async function () {

    console.log('saved')

})

const Person = mongoose.model('Person', personSchema);



