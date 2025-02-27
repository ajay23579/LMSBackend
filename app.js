const express = require('express')
const app = express()
const connectToDatabase = require('./database/index.js')
const Book = require('./model/book.Model.js')


// multerconfig import
const {multer ,storage} = require('./middleware/multerConfig.js')
const upload = multer({storage : storage})


app.use(express.json())
// app.use(express.urlencoded({extended:true})) // for not using react as front end





connectToDatabase()
app.get('/',(req,res)=>{
    res.json({
        message:"Hello World"
    })
})


// create Book
app.post('/book',upload.single("image"),async(req,res)=>{
    const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publication} = req.body //destructuring
    await Book.create({
        bookName,
        bookPrice,
        isbnNumber,
        authorName,
        publishedAt,
        publication,
    })
    res.json({
        message:"Book created"
    })
})

//all read
app.get("/book",async(req,res)=>{
    const books = await Book.find()
    res.status(200).json({
        data : books
    })
})


//single read
app.get("/book/:id",async(req,res)=>{
    const id = req.params.id
    const book = await Book.findById(id) //returns object
    // Book.find({id : id}) is not used because of performance and other factor
    if(!book){
        return res.status(404).json({
            message: "Book not found"
        });
        }
    res.status(200).json({
        message : "Book found",
        data : book
    })
}
)

// //Delete Single Book using GET Method
// app.get("/deletebook/:id",async(req,res)=>{
//     const id = req.params.id
//     await Book.findByIdAndDelete(id)
//     res.status(200).json({
//         message : "Book Deleted Sucessfully"
//     })
// })
//due to security reasons we use delete method to delete the book

//Delete Single Book using DELETE Method
app.delete("/book/:id",async(req,res)=>{
    const id = req.params.id
    await Book.findByIdAndDelete(id)
    res.status(200).json({
        message : "Book Deleted Sucessfully"
    })
})

//Update Single Book using PATCH Method
app.patch("/book/:id",async(req,res)=>{
    const id = req.params.id
    const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publication} = req.body
    await Book.findByIdAndUpdate(id,{
        bookName,
        bookPrice,
        isbnNumber,
        authorName,
        publishedAt,
        publication,
    })
    res.status(200).json({
        message : "Book Updated Sucessfully"
    })
})





app.listen(3000,()=>{
    console.log('server is running on http://localhost:3000');
})
