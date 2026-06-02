import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard';

function AllProducts() {

    const {products, searchQuery} = useContext(AppContext);
    const [filteredPoducts, setFilteredProducts] = useState([ ])

    useEffect(()=>{

        if(searchQuery.length > 0){
            setFilteredProducts(
                products.filter(item=> item.name.toLowerCase().includes(searchQuery.toLowerCase()) )
            );
        }else{
            setFilteredProducts(products)
        }

    },[products, searchQuery])
  return (
    <div className='mt-16'>
        
        <h1 className='text-3xl lg:text-4xl font-medium'>All Products</h1>
        <div className='my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center justify-center'>
            {filteredPoducts.filter(item=> item.inStock).map((item, index) =>
                <ProductCard key={index} item= {item}/>
            )
            
            }
        </div>
        
        </div>
  )
}

export default AllProducts