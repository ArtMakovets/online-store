import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "@/store/Cart/cart-context";

function ProductCard({ product }) {
  const cartCtx = useContext(CartContext);

  const addToCartHandler = () => {
    const amount = 1; // later: move to arg
    cartCtx.addItem({
      id: product.id,
      name: product.title,
      amount: amount,
      price: product.price,
      image: product.image,
      imageAlt: product.imageAlt,
    });
  };

  return (
    <div
      key={product.id}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
    >
      <div className="bg-gray-200 group-hover:opacity-75 sm:h-96">
        <img
          src={product.image}
          alt={product.imageAlt}
          className="h-full w-full object-cover object-center sm:h-full sm:w-full"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-sm font-medium text-gray-900">
          <Link to={`/products/${product.id}`}>{product.title}</Link>
          {/* <a href={product.href}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.title}
          </a> */}
        </h3>
        <p className="text-sm text-gray-500">{product.description}</p>
        <div className="flex flex-1 flex-col justify-end">
          {/* <p className="text-sm italic text-gray-500">{product.options}</p> */}
          <p className="text-base font-medium text-gray-900">
            ${product.price}
          </p>
        </div>
        <div className="flex items-center">
          <div className="mt-2">
            <button
              className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
              onClick={addToCartHandler}
            >
              Add to cart<span className="sr-only">, Zip Tote Basket</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
