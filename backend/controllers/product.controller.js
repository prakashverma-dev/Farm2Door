import { v2 as cloudinary } from "cloudinary";
import Products from "../models/productModel.js";


// add Product : /api/product/add

export const addProduct = async (req, res)=>{

    try {
        const {name, description, price, offerPrice, category } = req.body;

        // To handle image, when seller upload to add to product -
        const images = req.files;

        // Firstly we fetch upload images from multer, then we make that image upload to cloudinary then cloudinary returns image URL which we save into our database i.e cloudinary Images Url in our database.
        let imageURL = await Promise.all(images.map(async (item)=>{

            let result = await cloudinary.uploader.upload(item.path, {
                resource_type : "image"
            });

            return result.secure_url;
        }));

        await Products.create({
            name, 
            description, 
            price, 
            offerPrice, 
            category,
            image : imageURL
        })

        res.status(201).json({message : "Product added successfully", success : true});

    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal Server Error"})
    }
}

// get Products : /api/product/get

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