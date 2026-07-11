import React, { useState } from 'react'
import { assets, categories } from '../../assets/assets.js';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext.jsx';
import toast from 'react-hot-toast';

function AddProduct() {

  const [files, setFiles] = useState([]); //product images we will stores here in Array.
  const [name, setName] = useState(""); //product name
  const [description, setDescription] = useState(""); // product description
  const [category, setCategory] = useState(""); // product category
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const [loading, setLoading] = useState(false);

  const {axios} = useContext(AppContext);


  const handleSubmit = async (e)=>{
 
        try {

            e.preventDefault();
            setLoading(true);

            //Preparing the FormData Object to send to backend -
            //By using FormData() Object, When passed to a network request body, it automatically encodes the data using the "multipart/form-data" encoding type i.e sends it as multipart/form-data bydefault without making it, making it the standard choice for uploading files.
            // By Default normal data send vai form goes in Content-Type: application/json data.

            const productObj = new FormData();
        
            // Note : Multer expect formData object which is set as multipart/form-data not application/json as Multer only parses multipart/form-data.

            productObj.append("name", name);
            productObj.append("description", description);
            productObj.append("category", category);
            productObj.append("price", price);
            productObj.append("offerPrice", offerPrice);


            for (let i = 0; i<files.length; i++){
                productObj.append("images", files[i]);
            }

            // console.log("ProductObj:", Array.from(productObj));

            const {data} = await axios.post("/api/product/add-product", productObj);

            if(data.success){

                toast.success(data.message);

                
                setName("");
                setDescription("");
                setCategory("");
                setPrice("");
                setOfferPrice("");
                setFiles([]);
            }

        } catch (error) {
            
           if (error.response) {
                    // Backend responded with an error status (400, 401, 500...)
                        toast.error(error.response.data.message);

                    } else if (error.request) {
                        // Request was made but no response received (e.g., server is down) 
                        toast.error(error.message);
                    } else {
                        // Something else happened
                        toast.error(error.message);
                    }
        }finally {
        setLoading(false);
    }
  }

    return (
        <>
    {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-primary-txt rounded-full animate-spin"></div>
                <p className="text-gray-700 font-medium">
                    Uploading product...
                </p>
            </div>
        </div>
    )}


        <div className="py-10 flex flex-col justify-between bg-white">
            <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
                <div>
                    <p className="text-base font-medium">Product Image</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {Array(4).fill('').map((_, index) => (
                            <label key={index} htmlFor={`image${index}`}>
                                <input onChange={(e)=>{

                                    const updatedFiles = [...files];
                                    updatedFiles[index] = e.target.files[0]; 
                                    setFiles(updatedFiles);

                                }} accept="image/*" type="file" id={`image${index}`} hidden  />

                                <img className="max-w-24 cursor-pointer" src={ files[index] ? 
                                     URL.createObjectURL(files[index]) : assets.upload_area } alt="uploadArea" width={100} height={100} />
                            </label>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
                    <input onChange={(e)=> setName(e.target.value)} value={name} id="product-name" type="text" placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
                    <textarea onChange={(e)=> setDescription(e.target.value)}  value={description} id="product-description" rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here" required></textarea>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label  className="text-base font-medium" htmlFor="category">Category</label>
                    <select onChange={(e)=> setCategory(e.target.value)} value={category} id="category" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required>
                        <option value="">Select Category</option>
                        {
                            categories.map((item, index)=>{
                                return  <option key={index} value={item.path} >
                                            {item.path}
                                        </option>

                            })
                        }
                    </select>
                </div>
                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
                        <input onChange={(e)=> setPrice(e.target.value)} value={price}  id="product-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
                        <input onChange={(e)=> setOfferPrice(e.target.value)} value={offerPrice} id="offer-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                </div>
                <button className="px-7 py-2.5 bg-primary-btn hover:bg-primary-hover-btn text-white font-medium rounded">Add Product</button>
            </form>
        </div>

          
</>
    );
};

export default AddProduct