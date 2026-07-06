import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { data, Link } from 'react-router-dom'
import toast from 'react-hot-toast'


function SellerLogin() {

     const {isSeller, setIsSeller, navigate, axios} = useContext(AppContext)
     
      const [formData, setFormData] = useState({
          email: '',
          password: ''
      })

      useEffect(()=>{

        if (isSeller){
          navigate("/seller")  
        } 
      }, [isSeller])

     
     
  
      const handleSubmit = async (e) => {

            e.preventDefault() 

          try {
                // Note : While working with async await with axios :-

                // a) If the backend returns 2xx status code : It will be received in the standard {data} property.Remember, if not 2xx we will not received any {data} property rather received in catch block as error.
                //b) If backend returns 4xx or 5xx status code : Axios automatically rejects the promise, skipping {data} and throwing an error that must be caught inside the catch block with Errro response from backend.

                // Awaiting the Successfull 2xx Status code here only to receice standard {data} property by axios. if Not 2xx then Error Response will be throw in catch block by axios -  
                const {data} = await axios.post("/api/seller/login", {
                    email : formData.email,
                    password : formData.password,

                });
                
                // console.log("Response Data On 200 Code, login successful :", data);

                // Double checking Success with backend manual success property added//if success property there with true then -
                if (data.success){
                    
                    setIsSeller(true);
                    navigate("/seller");
                    toast.success(data.message);
                    
                }
        
        } catch (error) {

            // Note : When the backend returns a non-2xx status code (such as 400, 401, 403, 404, 500), Axios automatically throws an error and reach to catch block directly so dont expect to handle error in response data above like if (data.success) else.

            // Now, Checking the thrown Error Type, is it Response error or something else -
            
                    if (error.response) {
                    // Backend responded with an error status (400, 401, 500...)
                        // console.log("Backend sent a failure flag 400 or 500, Inside Data :", error.response);
                        toast.error(error.response.data.message);

                    } else if (error.request) {
                        // Request was made but no response received (e.g., server is down) 
                        toast.error(error.message);
                    } else {
                        // Something else happened
                        toast.error(error.message);
                    }

                    

                }

      }
  
      const handleChange = (e) => {
          const { name, value } = e.target
          setFormData(prev => ({ ...prev, [name]: value }))
      }


     return ( !isSeller &&  ( 

        <div className="fixed top-0 bottom-0 left-0 right-0 z-40 flex items-center justify-center bg-black/50 text-gray-600">


             <form onClick={(e)=> e.stopPropagation()} onSubmit={handleSubmit} className="sm:w-[350px] w-90% text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
                <h1 className="text-gray-900 text-2xl mt-10 font-medium"><span className="text-yellow-500">Seller</span> Login</h1>

                <p className="text-gray-500 text-sm mt-2">Please sign in to continue</p>
  

                <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-4 sm:pl-6 gap-2">

                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>

                    <input type="email" name="email" placeholder="Email id" className="border-none outline-none ring-0" value={formData.email} onChange={handleChange} required />

                </div>
                <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-4 sm:pl-6 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock-icon lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>

                    <input type="password" name="password" placeholder="Password" className="border-none outline-none ring-0" value={formData.password} onChange={handleChange} required />

                </div>
                {/* <div className="mt-4 text-left text-indigo-500">
                    <button className="text-sm" type="reset">Forget password?</button>
                </div> */}
                <button type="submit" className="mt-2 w-full h-11 rounded-full text-white bg-yellow-500 hover:opacity-90 transition-opacity">
                    Login
                </button>
                
                <p className="text-gray-500 text-sm mt-3 mb-11"> All Products <Link to={"/"} className="text-yellow-500 hover:underline">click here</Link></p>
            </form>
        </div>
           
    )
  )
}

export default SellerLogin