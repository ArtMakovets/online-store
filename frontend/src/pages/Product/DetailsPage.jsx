import React, { useContext, useEffect, useState } from "react";
import ProductContext from "@/store/Product/product-context";
import { useParams, useSearchParams } from "react-router-dom";
// import Spinner from "../components/common/loader/Spinner";
import SpinnerAlter from "@/components/common/loader/SpinnerAlter";
import CartContext from "@/store/Cart/cart-context";

function DetailsPage() {
  const defaultProduct = {};
  const { products, isLoading } = useContext(ProductContext);
  const cartCtx = useContext(CartContext);

  console.log("Products: ", products);
  console.log("Loading: ", isLoading);

  const [product, setProduct] = useState(defaultProduct);

  const pathParams = useParams();
  const productId =
    pathParams.id === undefined ? undefined : parseInt(pathParams.id);

  useEffect(() => {
    if (products.length > 0) {
      const product = products.find((item) => item.id === productId);
      console.log("Found Product: ", product);
      setProduct({ ...product, price: `$${product.price.toFixed(2)}` });

      // return () => {};
    }
  }, [products]);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("q");

  console.log("Search: ", searchTerm);

  const addToCartHandler = () => {
    const amount = 1; // later: move to arg
    cartCtx.addItem({
      id: product.id,
      name: product.title,
      amount: amount,
      price: product.price,
    });
  };

  // setSearchParams({ type: 'sometype', when: 'recent' });

  return (
    <div className="pt-24 pb-16">
      {isLoading ? (
        // <Spinner show={true} />
        <SpinnerAlter show={true} />
      ) : (
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* <!-- Image gallery --> */}
          <div className="flex flex-col-reverse">
            {/* <!-- Image selector --> */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <div
                className="grid grid-cols-4 gap-6"
                aria-orientation="horizontal"
                role="tablist"
              >
                <button
                  id="tabs-1-tab-1"
                  className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                  aria-controls="tabs-1-panel-1"
                  role="tab"
                  type="button"
                >
                  <span className="sr-only"> Angled view </span>
                  <span className="absolute inset-0 overflow-hidden rounded-md">
                    <img
                      src="https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-01.jpg"
                      alt=""
                      className="h-full w-full object-cover object-center"
                    />
                  </span>
                  {/* <!-- Selected: "ring-indigo-500", Not Selected: "ring-transparent" --> */}
                  <span
                    className="ring-transparent pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                    aria-hidden="true"
                  ></span>
                </button>
              </div>
            </div>

            <div className="aspect-h-1 aspect-w-1 w-full">
              {/* <!-- Tab panel, show/hide based on tab state. --> */}
              <div
                id="tabs-1-panel-1"
                aria-labelledby="tabs-1-tab-1"
                role="tabpanel"
                tabIndex="0"
              >
                <img
                  src="https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-01.jpg"
                  alt="Angled front view with bag zipped and handles upright."
                  className="h-full w-full object-cover object-center sm:rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* <!-- Product info --> */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.title}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {product.price}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6 text-base text-gray-700">
                <p>
                  The Zip Tote Basket is the perfect midpoint between shopping
                  tote and comfy backpack. With convertible straps, you can hand
                  carry, should sling, or backpack this convenient and spacious
                  bag. The zip top and durable canvas construction keeps your
                  goods protected for all-day use.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="sm:flex-col1 mt-10 flex">
                <button
                  type="submit"
                  className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  onClick={addToCartHandler}
                >
                  Add to cart
                </button>

                <button
                  type="button"
                  className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  <svg
                    className="h-6 w-6 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailsPage;
