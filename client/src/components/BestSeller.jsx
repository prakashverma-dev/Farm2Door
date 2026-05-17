import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import ProductCard from './ProductCard';

function BestSeller() {

    const {products} = useContext(AppContext)

    const stockedProducts = products.filter((item)=>{
        return item.inStock;
    }).slice(0,5); //slice used for getting only 5 objects data from array.


  return (
     <div className="mt-16">

        <p className="text-2xl font-medium md:text-3xl">Best Sellers</p>
        {/* Showing Products Here */}
        <div>
            {
                stockedProducts.map((item, index)=>{
                    return <div key={index}>
                        
                            <ProductCard item={item}/>
                    </div> 
                })
            }
        </div>

    </div>
  )
}

export default BestSeller