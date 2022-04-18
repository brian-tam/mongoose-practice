const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connection open')
    })
    .catch(err => {
        console.log('sorry thats an error')
        console.log('err')
    })





const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
})

const Movie = mongoose.model('Movie', movieSchema)


Movie.insertMany([
    { title: 'Before Sunrise', year: 2001, score: 10, rating: 'III' },
    { title: 'Before Sunlight', year: 2002, score: 10, rating: 'R' },
    { title: 'Before Sunburn', year: 2020, score: 11, rating: 'R' },
])
    .then(data => {
        console.log('it worked')
        console.log(data);
    })