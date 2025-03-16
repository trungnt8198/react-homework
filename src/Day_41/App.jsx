import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import NewProduct from "./pages/NewProduct";
import Products from "./pages/Products";
import Search from "./pages/Search";
import "./App.css";
import Header from "./components/Header";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/new-product" element={<NewProduct />} />
        <Route path="/products" element={<Products />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}
