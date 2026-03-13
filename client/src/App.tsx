import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ProductDetails from "./features/products/pages/ProductDetailsPage"
import ProductsPage from "./features/products/pages/ProductsPage"


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  )
}

export default App