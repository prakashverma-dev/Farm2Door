import multer from "multer";

// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. 

// NOTE: Multer will not process any form which is not multipart(enctype="multipart/form-data").


const storage =  multer.diskStorage({

        destination : "uploads",
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




//  const receiveFile2 =   multer({

//       storage : multer.diskStorage(({

//          destination : function(req, file, cb){
//             cb(null, "./uploads"); //foldername of desnation.
//          },

//          filename : function(req, file, cb){
//             cb(null, `${Date.now()} - ${file.originalname}`) //filename naming
//          }

//       }))
//    })
  
//const upload = receiveFile.single("profileImg") ; //For single file upload  

// const upload = receiveFile.fields([
//    {name : "profileImg", maxCount: 1 },
//    {name : "coverImg", maxCount: 2}
// ]) ; // For More than one file upload 
 
// //For static Frontend POST Method UI, So we send data from there -

//  server.get("/profile",(req, res)=>{
    
//    res.render('IV.multer.ejs');

//  })

//  server.post("/profile", upload, (req, res)=>{
    
//    console.log(req.body);
//    console.log(req.body.name);

//    console.log(req.file); //we receiving the single file upload in 'file' key

//    console.log(req.files); //we receiving the multiple file upload in 'files' key


//    res.json({msg : "Post Request Done!"})

//  })