const express = require('express')
const app = express()
const connectToDatabase = require('./database/index.js')
const fs = require('fs')



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
    if(!req.file){
        fileName = "http://localhost:3000/1740645702165-download.png"
    }else{
        fileName = "http://localhost:3000/" + req.file.filename
    }
    const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publication} = req.body //destructuring
    await Book.create({
        bookName,
        bookPrice,
        isbnNumber,
        authorName,
        publishedAt,
        publication,
        imageUrl : fileName
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
app.patch("/book/:id",upload.single("image"),async(req,res)=>{
    const id = req.params.id
    const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publication} = req.body
    const oldDatas = await Book.findById(id)
    if(req.file){
        const oldImagePath = oldDatas.imageUrl
        console.log(req.file)
        console.log(oldDatas)
        console.log(oldImagePath)
        const localHostUrlLength = "http://localhost:3000/".length
        const newOldImagePath = oldImagePath.slice(localHostUrlLength)
        console.log(newOldImagePath)
        fs.unlink( `storage/${newOldImagePath}`,(err)=>{
            if(err){
                console.log(err)
            }else{
                console.log("Deleted Sucessfully")
            }
        })
        fileName = "http://localhost:3000/" + req.file.filename
    }
    await Book.findByIdAndUpdate(id,{
        bookName,
        bookPrice,
        isbnNumber,
        authorName,
        publishedAt,
        publication,
        imageUrl : fileName
    })
    res.status(200).json({
        message : "Book Updated Sucessfully"
    })
})





app.use(express.static('./storage/'))

app.listen(3000,()=>{
    console.log('server is running on http://localhost:3000');
})
