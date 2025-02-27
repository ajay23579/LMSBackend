const multer = require('multer')



const storage = multer.diskStorage({
    destination : function(req,file,cb){
        const allowedFileTypes = ["image/jpeg","image/jpg","image/png"]
        if(!allowedFileTypes.includes(file.mimetype)){
            cb(new Error("Invalid file type"))  //cb(error)
            return
        }
        const allowedFileSize = [1048576]
        if(file.size > allowedFileSize[0]){
            cb(new Error("File size is too large"))  //cb(error)
            return
        }
        cb(null,'./storage') // --> cb(error,sucess)

    },
    filename : function(req,file,cb){
        cb(null,Date.now() + "-" + file.originalname)
    }
})


module.exports = {
    storage,
    multer
}