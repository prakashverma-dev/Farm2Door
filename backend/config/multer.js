import multer from "multer";

export const upload = multer({
    storage : multer.diskStorage({})
})

// const storage = multer.diskStorage({
//     destination : "uploads",
//     filename : 
// })