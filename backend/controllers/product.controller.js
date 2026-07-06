import { v2 as cloudinary } from "cloudinary";
import Products from "../models/productModel.js";
import fs from "fs";


// add Product : /api/product/add-product

export const addProduct = async (req, res)=>{

    try {
        // req.body will contain the text fields only.
        // we receiving the single file upload from form data in req.file.
        // we receiving the multiple files upload from form data in form of array in req.files.

        // console.log("Req.files :", req.files)
        // console.log("Req.body :", req.body)

        const {name, description, price, offerPrice, category } = req.body;

        //Multer handles form-file data in req.files object, when only passed by enctype="multipart/form-data"- 
        const files = req.files;

         if (!files || files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded', success : false });

            }
        
        if(!name || !description || !price || !offerPrice || !category ){
            res.status(400).json({message : "All Fields are required", success : false});  
        }

 

        // Firstly we fetch upload images from multer, then we make that image upload to cloudinary then cloudinary returns image URL which we save into our database i.e cloudinary Images Url in our database.
        let imagesURL = await Promise.all(
            
            files.map(async (item)=>{

                const result = await cloudinary.uploader.upload(
                    item.path, 
                    {resource_type : "image"} );

                   // Delete local file
                    fs.unlinkSync(item.path);

                return result.secure_url;
        }));


        await Products.create({
            name, 
            description, 
            price, 
            offerPrice, 
            category,
            image : imagesURL
        })

        res.status(201).json({message : "Product added successfully", success : true});

    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal Server Error"})
    }
}

// get Products : /api/product/list-products

export const getProducts = async( req, res)=>{

    try {

        const products = await Products.find({}).sort({createdAt : -1});
        res.status(200).json({products, success : true});
        
    } catch (error) {

      res.status(500).json({message : "Internal Server Error", Error : error.message}) ;
    }

}

// get single product : /api/product/id


export const getProductById = async( req, res)=>{

    try {
        const {id} = req.body;

        const product = await Products.findById(id);
        if(!product){
            res.status(404).json({message : "Product not found", success : false});
        }

        res.status(200).json({product , success : true});
        
    } catch (error) {

      res.status(500).json({message : "Internal Server Error", Error : error.message}) ;
    }

}


// To check stock or change Stock : api/product/stock 

export const changeStock = async (req, res)=>{
    try {
         const {id, inStock} = req.body;
         const product = await Products.findByIdAndUpdate(id, {inStock}, {new : true});

        if(!product){
            res.status(404).json({message : "Product not found", success : false});
            }

        res.status(200).json({product, message : "Stock Updated" , success : true});

    } catch (error) {

      res.status(500).json({message : "Internal Server Error", Error : error.message}) ;
    }
}