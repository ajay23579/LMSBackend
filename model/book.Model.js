const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    bookName:{
        type : String,
        unique : true,    // to make the book name unique
        required : true //the book name cant be empty
    },
    bookPrice : {
        type : Number
    },
    isbnNumber : {
        type : String
    },
    authorName : {
        type : String
    },
    publishedAt : {
        type : String
    },
    publication : {
        type : String
    },
    imageUrl :{
        type : String
    }
})


const Book = mongoose.model('Book',bookSchema)
module.exports = Book