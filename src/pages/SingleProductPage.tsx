import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { Product } from "../types/types";
import { FaStar } from "react-icons/fa";
import Loader from "../components/Loader";
import { API_URL, fetchData } from "../api/api";

function SingleProductPage() {
    const [product,setProduct] = useState<Product>();
    const [error,setError] = useState(false);
    const {id} = useParams();

    useEffect(()=>{
        async function loadData(){
            try {
                const data = await fetchData<Product>(`${API_URL}${id}`);
                setProduct(data);
            } catch (error) {
                setError(true)
            }
        }
       loadData();
    },[]);

    if(error){
        return <div>
            <h1>An error occured while fetching the product.</h1>
        </div>
    }
  return (
    <div>

        {product?
        <main className="mx-auto my-8 w-[90%]">
        <Link to="/" className="bg-black text-white px-6 py-3 rounded hover:bg-gray-700 cursor-pointer inline-block">Back Home</Link>
         <div className="flex items-center my-4 lg:flex-row md:flex-row flex-col gap-16 justify-center">
            <div className="w-[40%]">
            <img src={product.image} alt={product.title}/>
            </div>
            <div className="w-[50%] space-y-2">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p>{product.description}</p>
            <p><strong>Category: </strong>{product.category}</p>
            <p><strong>Price:</strong> $ {product.price}</p>
            <p className="flex items-center gap-1"><strong>Rating:</strong> <FaStar className="text-yellow-300"/>{product.rating.rate} {`(${product.rating.count})`} </p>
            </div>
           
        </div>
        </main>
       :<Loader/>}
    </div>
  )
}

export default SingleProductPage