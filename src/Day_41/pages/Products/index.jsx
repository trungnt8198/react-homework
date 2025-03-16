import React, { useEffect, useState } from "react";
import ProductList from "../../components/ProductList";
import Loading from "../../components/Loading";

const Products = () => {
  const params = new URLSearchParams(location.search);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(+params.get("page") || 1);
  const [perPage, setPerPage] = useState(params.get("per_page") || 10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api01.f8team.dev/api/products?page=${currentPage}&per_page=${perPage}`
    )
      .then((res) => res.json())
      .then((res) => {
        setTotalPages(res.last_page);
        setProducts(res.data);
        history.replaceState(
          null,
          null,
          `?page=${currentPage}&per_page=${perPage}`
        );
      })
      .catch((err) => alert(err))
      .finally(() => setLoading(false));
  }, [currentPage, perPage]);

  return (
    <div className="page-container">
      <h1 className="page-title">Danh Sách Sản Phẩm</h1>
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

export default Products;
