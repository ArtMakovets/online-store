import React from "react";
import ProductContext from "@/store/Product/product-context";
import useProducts from "@/hooks/useProducts";

const productReducer = (state, action) => {
  switch (action) {
    case action.type === "ADD":
      break;

    case action.type === "REMOVE":
      break;

    case action.type === "ADD":
      break;

    case action.type === "ADD":
      break;

    default:
      break;
  }
};

function ProductProvider({ children }) {
  // const productsInContext = React.useContext(ProductContext);
  const productsData = useProducts();

  return (
    <ProductContext.Provider value={productsData}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
