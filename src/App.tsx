import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ProductsPage from "./pages/ProductsPage";
import SingleProductPage from "./pages/SingleProductPage";

const router = createBrowserRouter([{
  path:"/",
  element:<ProductsPage/>
},{
  path:"/:id",
  element:<SingleProductPage/>
}])
const App = () => {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App