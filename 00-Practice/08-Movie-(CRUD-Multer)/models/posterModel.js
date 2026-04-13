const moongoose = require('mongoose');

const MovieSchema = new moongoose.Schema({
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    releaseYear: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    posterImage: {
        type: String,
        required: true
    }
});

const Movie = moongoose.model('Movie', MovieSchema);

module.exports = Movie;