import React, { useEffect, useState } from "react";
import ProductList from "../../components/ProductList";
import Loading from "../../components/Loading";
import debounce from "../../pages/Search/Debounce";
import "./Search.css";

const Search = () => {
  const params = new URLSearchParams(location.search);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(+params.get("page") || 1);
  const [perPage, setPerPage] = useState(params.get("per_page") || 10);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState(params.get("q") || "");

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api01.f8team.dev/api/products?q=${query}&page=${currentPage}&per_page=${perPage}`
    )
      .then((res) => res.json())
      .then((res) => {
        setTotalPages(res.last_page);
        setProducts(res.data);
        history.replaceState(
          null,
          null,
          `?q=${query}&page=${currentPage}&per_page=${perPage}`
        );
      })
      .catch((err) => alert(err))
      .finally(() => setLoading(false));
  }, [query, currentPage, perPage]);

  const debounceSearch = debounce((value) => setQuery(value), 1000);

  return (
    <div className="page-container">
      <h1 className="search-title">Tìm kiếm sản phẩm</h1>

      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Nhập tên sản phẩm..."
          onChange={(e) => debounceSearch(e.target.value)}
        />
        {/* <button className="search-button">Tìm kiếm</button> */}
      </div>

      {loading && <Loading />}
      {products.length > 0 && (
        <ProductList
          products={products}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          perPage={perPage}
          setPerPage={setPerPage}
          totalPages={totalPages}
        />
      )}
      {products.length == 0 && (
        <p className="empty-message">Không có sản phẩm nào.</p>
      )}
    </div>
  );
};

export default Search;
