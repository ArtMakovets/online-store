import React from "react";

const productContext = React.createContext({
  products: [],
  error: null,
  isLoading: true,
  setProducts: ([]) => {},
  setError: (err) => {},
});

export default productContext;
