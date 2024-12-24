import { useEffect, useState } from "react"
import { Product } from "../types/productType";
import { Link } from "react-router-dom";

const url:string = "https://fakestoreapi.com/products"

function ProductsPage() {
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [products,setProducts] = useState<Product[]>([]);

    useEffect(()=>{
        const fetchProdcuts = async (url:string)=>{
            setLoading(true);
            try {
                const response = await fetch(url);
                if(!response.ok){
                    throw new Error("An error occured while fetching the products.")
                }
                const data:Product[] = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
                console.log(error);  
            }
        }
        fetchProdcuts(url);
    },[])

    if(loading){
        return <h1>Loading....</h1>
    }
    if(error){
        return <h1>An error occured.</h1>
    }
  return (
    <div className="grid grid-cols-3">{products.map((product,index)=>{
        const {id,title,price,description,category,image,rating} = product
        return <div key={index} >
            <img src={image} alt={title} className="w-16"/>
            <h1>{product.title}</h1>
            <Link to={`/${id}`}>Learn More</Link>
        </div>
    })}</div>
  )
}

export default ProductsPage