import { useEffect, useState } from "react";
import { CanceledError } from "axios";
import Repository from "@/repositories/RepositoryFactory";

const Products = Repository.get("Products");

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = Products.getAll();
    request
      .then((res) => {
        setTimeout(() => {
          setProducts(res.products);
          setLoading(false);
        }, 2000);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => cancel();
  }, []);

  return { products, error, isLoading, setProducts, setError };
};

export default useProducts;
