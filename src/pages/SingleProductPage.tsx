import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Product } from "../types/productType";
import { Link } from "react-router-dom";

const url = "https://dummyjson.com/products/"

function SingleProductPage() {
    const [product,setProduct] = useState<Product>();
    const [error,setError] = useState(false);
    const {id} = useParams();

    useEffect(()=>{
        async function fetchSingleProduct(url:string){
            try {
                const response = await fetch(url);
                if(!response.ok){
                    throw new Error("An error occured");
                }
                const data:Product = await response.json();
                setProduct(data);
            } catch (error) {
                setError(true)
            }
        }
        fetchSingleProduct(`${url}${id}`);
    },[]);

    if(error){
        return <div>
            <h1>An error occured while fetching the product.</h1>
        </div>
    }
  return (
    <div>

        {product?
        <>
        <Link to="/">Back Home</Link>
         <div>
            <img src={product.images[0]} alt={product.title} />
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating.rate} {`(${product.rating.count})`}</p>
        </div>
        </>
       :<h1>Loading....</h1>}
    </div>
  )
}

export default SingleProductPage