import React, { useEffect, useState } from "react";
import ProductForm from "../../components/ProductForm";

const NewProduct = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">Tạo Sản Phẩm Mới</h1>
      <ProductForm heading="Tạo Sản Phẩm Mới" submitTitle="Tạo sản phẩm" />
    </div>
  );
};

export default NewProduct;
