import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext';
import { Link, useParams } from 'react-router-dom';
import { assets } from '../assets/assets';

// This is Product Detail Page -
function ProductDetail() {

    const { products, navigate, addToCart }  = useContext(AppContext);
  const [thumbnail, setThumbnail] = React.useState(null);

  // Will work to receive URL dynamic id here and we will filter out that id item from complete items and display here -

  const {id} = useParams();

  const filteredProduct = products.find(item=> item._id === id);

  useEffect(()=>{

      setThumbnail(filteredProduct?.image[0] ? filteredProduct.image[0] : null );

  },[filteredProduct]) ;  




    return ( 
    
    filteredProduct && (
        <div className="max-w-6xl w-full px-6 mt-16">
            <p>
                <Link to={"/"}>Home</Link> /
                <Link to={"/products"}> All Products</Link> /
                <Link to={`/categorydetail/${filteredProduct.category.toLowerCase()}`}> {filteredProduct.category}</Link> /
                <span className="text-green-700"> {filteredProduct.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {filteredProduct.image.map((image, index) => (
                            <div key={index} onClick={() => setThumbnail(image)} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
                                <img src={image} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
                        <img src={thumbnail} alt="Selected product" className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">{filteredProduct.name}</h1>

                    <div className="flex items-center gap-0.5 mt-1">
                        {Array(5).fill('').map((_, i) => (
                            filteredProduct.rating > (

                              <img 
                              src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                              alt="rating"
                              className="w-3.5 md:w-4"       
                              />
                                 
                            ) 
                        ))}
                        <p className="text-base ml-2">(4)</p>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">MRP: ${filteredProduct.price}</p>
                        <p className="text-2xl font-medium">MRP: ${filteredProduct.offerPrice}</p>
                        <span className="text-gray-500/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <ul className="list-disc ml-4 text-gray-500/70">
                        {filteredProduct.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>

                    <div className="flex items-center mt-10 gap-4 text-base">
                        <button onClick={()=> addToCart(filteredProduct._id)} className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition" >
                            Add to Cart
                        </button>
                        <button onClick={()=> {
                          addToCart(filteredProduct._id);
                          navigate("/cart");
                        }}
                                
                                              className="w-full py-3.5 cursor-pointer font-medium bg-green-700 text-white hover:bg-green-900 transition" >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
    );
};

export default ProductDetail


