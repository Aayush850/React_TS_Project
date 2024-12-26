import { useEffect, useState } from "react"
import { Product,ApiResponse } from "../types/types";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import { fetchData } from "../api/api";
import { API_URL } from "../api/api";


function ProductsPage() {
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [products,setProducts] = useState<Product[]>([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [totalPages,setTotalPages] = useState(0);    

    useEffect(()=>{
        const loadData = async ()=>{
            setLoading(true);
            try {
                const data = await fetchData<ApiResponse>(API_URL);
                setProducts(data.products);
                setTotalPages(data.numOfPages);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }
       loadData()
    },[currentPage])

    if(loading){
        return <Loader/>
    }

    if(error){
        return <h1>An error occured.</h1>
    }
  return (

    <section className="products-section w-[90%] my-8 mx-auto">
    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2">{products.map((product)=>{
        const {id,title,image} = product
        return <div key={id} className="border flex flex-col justify-center items-center p-2">
            <img src={image} alt={title} className="h-48 w-48 object-cover"/>
            <h1 className="text-lg">{product.title}</h1>
            <Link to={`/${id}`} className="text-blue-600">Learn More</Link>
        </div>
    })}</div>
        <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} currentPage = {currentPage}/>
    </section>


  )
}

export default ProductsPage