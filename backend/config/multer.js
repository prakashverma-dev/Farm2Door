import multer from "multer";

// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. 

// NOTE: Multer will not process any form which is not multipart(enctype="multipart/form-data").

const uploadDir = "/tmp";

const storage =  multer.diskStorage({

        destination : uploadDir,
        filename : (req, file, cb) => {
            return cb(null, `${Date.now()} - ${file.originalname}`);
        }
        
    })

const fileFilter = (req, file, cb) => {

  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false); 
  }

}

// This is the multer middle ware to handle media data uploaded from frontend -
export const receiveFile = multer({ 

    storage,
    fileFilter,
    limits: {
        fileSize: 3 * 1024 * 1024, // 5 MB
    },

})



  

    
