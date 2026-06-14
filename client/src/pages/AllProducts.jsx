import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard';

function AllProducts() {

    const {products, searchQuery, setSearchQuery} = useContext(AppContext);
   
    // We want to display products based on search or not (by this as per search entry we will not modify the original products at app context) -
    const [displayProducts, setDisplayProducts] = useState([ ])

    useEffect(()=>{

        if(searchQuery.length > 0){
            setDisplayProducts(
                products.filter(item=> item.name.toLowerCase().includes(searchQuery.toLowerCase()) )
            );
        }else{
            setDisplayProducts(products)
        }

    },[products, searchQuery]);


    // When user leave this page or component, then search entered string will clear out -
    useEffect(() => {
        return () => {
            setSearchQuery("");
        };
    }, []);

   


  return (
    <div className='mt-16'>
        
        <h1 className='text-3xl lg:text-4xl font-medium'> Products</h1>
        <div className='my-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center justify-center'>
            {displayProducts.filter(item=> item.inStock).map((item, index) =>
                <ProductCard key={index} item= {item}/>
            )
            
            }
        </div>
        
        </div>
  )
}

export default AllProducts