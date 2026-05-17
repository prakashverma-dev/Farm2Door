import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';


// Single Product Card only (we made it in seperate component for understanding it -)
function ProductCard({item}) {

    const { navigate } = useContext(AppContext);
    
  return (

    item && (
    <div className='border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full'>
        <div className='group cursor-pointer flex items-center justify-center px-2'>

            <img src={item.image[0]} alt="" className='group-hover:scale-105 transition max-w-26 md:max-w-36' />

        </div>
        <div className='text-gray-500/60 text-sm'>

        <p>{item.category}</p>
        <p className='text-gray-700 font-medium text-lg truncate w-full'>{item.name}</p>
            <div className='flex items-center gap-0.5 '>
                {
                    Array(5).fill('')
                    
                }

            </div>
        </div>

    </div>
    )
  )
}

export default ProductCard