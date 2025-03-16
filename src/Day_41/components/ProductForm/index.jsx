import React, { useState } from "react";
import "./ProductForm.css";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import { productProperties, initFormValues } from "./ProductProperties";

const ProductForm = ({ submitTitle = "" }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState(() =>
    initFormValues(productProperties)
  );
  const [errors, setErrors] = useState({});

  const handleFieldValue = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const processBeforeSubmit = (data) => {
    const processedData = { ...data };
    Object.keys(processedData).forEach(
      (key) => (processedData[key] = processedData[key].trim())
    );
    if (processedData.tags) {
      processedData.tags = processedData.tags.split(",").map((t) => t.trim());
    }
    return processedData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const processedData = processBeforeSubmit(formValues);

    fetch("https://api01.f8team.dev/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(processedData),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          alert(res.message);
        } else if (res.errors) {
          setErrors(res.errors);
        } else {
          alert("Tạo sản phẩm thành công !");
          setFormValues(initFormValues);
          if (confirm("Bạn có muốn chuyển sang trang danh sách sản phẩm ?")) {
            navigate("/products");
          }
        }
      })
      .catch((err) => {
        console(err);
        alert(
          "An error occurred while creating the product. Please try again."
        );
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="product-form-container">
      {loading && <Loading />}
      <form className="product-form" onSubmit={handleSubmit}>
        {productProperties.length > 0 &&
          productProperties.map((property) => (
            <div key={property.name} className="form-group">
              <input
                type={property.type}
                name={property.name}
                className="form-input"
                placeholder={property.placeholder}
                required={property.required}
                value={formValues[property.name]}
                onChange={handleFieldValue}
              />
              {errors[property.name] && (
                <p className="error-message">{errors[property.name]}</p>
              )}
            </div>
          ))}
        <button type="submit" className="submit-button">
          {submitTitle}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
