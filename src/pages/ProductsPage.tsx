import { useEffect, useState } from "react"
import { Product } from "../types/productType";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";

const url:string = "https://dummyjson.com/products"

function ProductsPage() {
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [products,setProducts] = useState<Product[]>([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [postPerPage,setPostPerPage] = useState(8);

    const startIndex = (currentPage - 1)* postPerPage;
    const endIndex = startIndex + postPerPage
    const totalPages = Math.ceil(products.length / postPerPage) ;
    const currentProdcuts = products.slice(startIndex,endIndex);
    

    useEffect(()=>{
        const fetchProdcuts = async (url:string)=>{
            setLoading(true);
            try {
                const response = await fetch(url);
                if(!response.ok){
                    throw new Error("An error occured while fetching the products.")
                }
                const data = await response.json();
                setProducts(data.products);
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

    <section className="products-section w-[90%] mx-auto">
    <div className="grid grid-cols-3">{currentProdcuts.map((product,index)=>{
        const {id,title,images} = product
        return <div key={index} className="border">
            <img src={images[0]} alt={title} className="w-16"/>
            <h1>{product.title}</h1>
            <Link to={`/${id}`}>Learn More</Link>
        </div>
    })}</div>
        <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage}/>
    </section>


  )
}

export default ProductsPage