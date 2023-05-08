import React, { useState, useEffect, useContext } from "react";
// import Repository from "@/repositories/RepositoryFactory";
import ProductGrid from "@/components/Product/ProductGrid";
// import { CanceledError } from "axios";
import useProducts from "@/hooks/useProducts";
// import Spinner from "../components/common/loader/Spinner";
import SpinnerAlter from "@/components/common/loader/SpinnerAlter";
import ProductContext from "@/store/Product/product-context";

// const Products = Repository.get("Products");

function HomePage() {
  // const { products, error, isLoading, setProducts, setErrors } = useProducts();
  const { products, error, isLoading, setProducts, setErrors } =
    useContext(ProductContext);

  console.log("Products: ", products);

  return (
    <>
      <div className="border-b border-gray-200 pb-10 pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Product List
        </h1>
        <p className="mt-4 text-base text-gray-500">
          Checkout out the latest products!
        </p>
      </div>
      <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
        <aside>
          <h2 className="sr-only">Filters</h2>

          <button type="button" className="inline-flex items-center lg:hidden">
            <span className="text-sm font-medium text-gray-700">Filters</span>
            <svg
              className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
          </button>

          <div className="hidden lg:block">
            <form className="space-y-10 divide-y divide-gray-200">
              <div className="pt-10">
                <fieldset>
                  <legend className="block text-sm font-medium text-gray-900">
                    Category
                  </legend>
                  <div className="space-y-3 pt-6">
                    <div className="flex items-center">
                      <input
                        id="category-0"
                        name="category[]"
                        value="new-arrivals"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor="category-0"
                        className="ml-3 text-sm text-gray-600"
                      >
                        All New Arrivals
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="category-1"
                        name="category[]"
                        value="tees"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor="category-1"
                        className="ml-3 text-sm text-gray-600"
                      >
                        Tees
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="category-2"
                        name="category[]"
                        value="crewnecks"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor="category-2"
                        className="ml-3 text-sm text-gray-600"
                      >
                        Crewnecks
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="category-3"
                        name="category[]"
                        value="sweatshirts"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor="category-3"
                        className="ml-3 text-sm text-gray-600"
                      >
                        Sweatshirts
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="category-4"
                        name="category[]"
                        value="pants-shorts"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor="category-4"
                        className="ml-3 text-sm text-gray-600"
                      >
                        Pants &amp; Shorts
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </form>
          </div>
        </aside>

        <section
          aria-labelledby="product-heading"
          className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3"
        >
          <h2 id="product-heading" className="sr-only">
            Products
          </h2>

          {error && <p className="text-red-500">{error}</p>}
          {isLoading ? (
            // <Spinner show={true} />
            <SpinnerAlter show={true} />
          ) : (
            <ProductGrid products={products} />
          )}
        </section>
      </div>
    </>
  );
}

export default HomePage;
