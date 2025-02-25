const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    bookName:{
        type : String,
    },
    bookPrice : {
        type : Number
    },
    isbnNumber : {
        type : Number
    },
    authorName : {
        type : String
    },
    publishedAt : {
        type : String
    },
    publication : {
        type : String
    }
})


const Book = mongoose.model('Book',bookSchema)
module.exports = Book