import "./ProductList.css";

function ProductList({
  products,
  currentPage,
  setCurrentPage,
  perPage,
  setPerPage,
  totalPages,
}) {
  const perPageOptions = [10, 20, 50, 100];
  const pagesPerBlock = 5;

  const handlePerPageChange = (e) => {
    setPerPage(e.target.value);
    setCurrentPage(1);
  };

  const getCurrentPageBlockIndex = (page) => {
    return Math.floor((page - 1) / pagesPerBlock);
  };

  const getCurrentPagesBlock = () => {
    const pages = [...Array(totalPages)].map((_, index) => index + 1);
    const currentBlockIndex = getCurrentPageBlockIndex(currentPage);
    const blocks = pages.filter(
      (page) => getCurrentPageBlockIndex(page) === currentBlockIndex
    );
    return blocks;
  };

  const pagesBlock = getCurrentPagesBlock();

  return (
    <div className="product-list-container">
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="product-image"
            />
            <div className="product-info">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">${product.price}</p>
              <p className="product-stock">Còn {product.stock} sản phẩm</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="pagination-container">
        <div className="items-per-page">
          <label htmlFor="itemsPerPage">Hiển thị:</label>
          <select
            id="itemsPerPage"
            className="items-select"
            onChange={handlePerPageChange}
            value={perPage}
          >
            {perPageOptions.map((optionValue) => (
              <option key={optionValue} value={optionValue}>
                {optionValue}
              </option>
            ))}
          </select>
        </div>

        <div className="pagination">
          <button
            className="page-button"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ⬅ Trước
          </button>

          <div className="page-numbers">
            {pagesBlock.map((page) => (
              <button
                key={page}
                className={`page-number ${
                  currentPage === page ? "active" : ""
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className="page-button"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Tiếp ➡
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
