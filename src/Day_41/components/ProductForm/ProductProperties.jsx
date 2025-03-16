export const productProperties = [
  {
    name: "title",
    type: "text",
    placeholder: "Tên sản phẩm",
    required: true,
  },
  {
    name: "description",
    type: "textarea",
    placeholder: "Mô tả sản phẩm",
    required: true,
  },
  {
    name: "category",
    type: "text",
    placeholder: "Danh mục",
    required: true,
  },
  {
    name: "price",
    type: "number",
    placeholder: "Giá ($)",
    required: true,
  },
  {
    name: "discountPercentage",
    type: "number",
    placeholder: "Giảm giá (%)",
    required: true,
  },
  {
    name: "rating",
    type: "number",
    placeholder: "Đánh giá (0-5)",
    required: true,
  },
  {
    name: "stock",
    type: "number",
    placeholder: "Tồn kho",
    required: true,
  },
  {
    name: "tags",
    type: "text",
    placeholder: "Tags (cách nhau bằng dấu phẩy)",
    required: true,
  },
  {
    name: "brand",
    type: "text",
    placeholder: "Thương hiệu",
    required: true,
  },
  {
    name: "sku",
    type: "text",
    placeholder: "Mã SKU",
    required: true,
  },
  {
    name: "weight",
    type: "number",
    placeholder: "Trọng lượng (kg)",
    required: true,
  },
  {
    name: "minimumOrderQuantity",
    type: "number",
    placeholder: "Số lượng tối thiểu",
    required: true,
  },
  {
    name: "thumbnail",
    type: "text",
    placeholder: "URL hình ảnh",
    required: true,
  },
];

export const initFormValues = () => {
  let formValues = {};
  productProperties.forEach((property) => (formValues[property.name] = ""));
  return formValues;
};
