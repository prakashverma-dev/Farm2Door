import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard";

// This is Category Detail Page -
function CategoryDetail() {

  
    const { products, navigate }  = useContext(AppContext); 
    const {categoryname} = useParams();

    const getCategory = categories.find(item=> item.path.toLowerCase() === categoryname.toLowerCase());

    const fileredProductsByCategory = products.filter(item=> item.category.toLowerCase() === categoryname); 


  return <div className="mt-16">

    {
      getCategory && (
        <div className="flex flex-col items-end w-max">
          
          <h1 className="text-3xl md:w-4xl font-medium">{getCategory.text.toUpperCase()}</h1>

        </div>


      )
    }
    {
      fileredProductsByCategory.length > 0 ? (
      <div>
          <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center justify-center">
            {fileredProductsByCategory.map((item, index) => (
              <ProductCard key={index} item={item} />
            ))}
          </div>

      </div> 
    
    ) : (

        <div>
          <h1 className="text-3xl md:text-4xl font-medium">
            No Products Found!
          </h1>
        </div>
    )
    }
  </div>;
}

export default CategoryDetail;
