import { v2 as cloudinary } from "cloudinary";
import Products from "../models/productModel.js";

// add Product : /api/product/add

export const addProduct = async (req, res)=>{
    try {
        const {name, description, price, offerPrice, category } = req.body;

        // To handle image, when seller upload to add to product -
        const images = req.files;

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

    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal Server Error"})
    }
}

// get Products : /api/product/get

export const getProducts = async( req, res)=>{

    try {
        
    } catch (error) {

      res.status(500).json({message : "Internal Server Error", Error : error.message}) ;
    }

}