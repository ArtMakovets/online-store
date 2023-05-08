import React, { useContext, useState } from "react";
import ProductContext from "@/store/Product/product-context";
import CartContext from "@/store/Cart/cart-context";
import { Link } from "react-router-dom";

const Header = () => {
  const { products } = useContext(ProductContext);

  const cartCtx = useContext(CartContext);

  const [cartPopupOpen, setCartPopupOpen] = useState(false);

  function toggleCartPopup() {
    setCartPopupOpen((cartPopupOpen) => !cartPopupOpen);
  }

  const cartItemsCount = cartCtx.items.length;

  console.log("Cart context: ", JSON.stringify(cartCtx));

  const clearCartHandler = () => {
    cartCtx.clearCart();
  };

  return (
    <header className="relative z-10">
      <nav aria-label="Top">
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-b border-gray-200">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center space-x-8">
                  {/* Logo (lg+) */}
                  <div className="hidden lg:flex lg:items-center">
                    <a href="#">
                      <span className="sr-only">Your Company</span>
                      <img
                        className="h-8 w-auto"
                        src="/logo.svg?color=indigo&shade=600"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="flex items-center space-x-8">
                    <Link
                      to="/"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Home
                    </Link>
                    <Link
                      to="/products/1"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Details
                    </Link>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-end">
                  <div className="flex items-center lg:ml-8">
                    <div className="flex space-x-8">
                      <div className="hidden lg:flex">
                        <a
                          href="#"
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">Search</span>
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                          </svg>
                        </a>
                      </div>

                      <div className="flex">
                        <a
                          href="#"
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">Account</span>
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>

                    <span
                      className="mx-4 h-6 w-px bg-gray-200 lg:mx-6"
                      aria-hidden="true"
                    />

                    <div className="flow-root relative">
                      <a
                        href="#"
                        className="group -m-2 flex items-center p-2"
                        onClick={toggleCartPopup}
                      >
                        <svg
                          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                          />
                        </svg>
                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                          {cartItemsCount}
                        </span>
                        <span className="sr-only">items in cart, view bag</span>
                      </a>

                      {cartPopupOpen && (
                        <div className="absolute inset-x-0 top-16 mt-px bg-white pb-6 shadow-lg sm:px-2 lg:left-auto lg:right-0 lg:top-full lg:-mr-1.5 lg:mt-3 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5">
                          <h2 className="sr-only">Shopping Cart</h2>

                          <form className="mx-auto max-w-2xl px-4">
                            <ul
                              role="list"
                              className="divide-y divide-gray-200"
                            >
                              {cartItemsCount > 0 ? (
                                cartCtx.items.map((item) => (
                                  <li
                                    key={item.id}
                                    className="flex items-center py-6"
                                  >
                                    <img
                                      src={item.image}
                                      alt={item.imageAlt}
                                      className="h-16 w-16 flex-none rounded-md border border-gray-200"
                                    />
                                    <div className="ml-4 flex-auto">
                                      <h3 className="font-medium text-gray-900">
                                        <a href="#">{item.name}</a>
                                      </h3>
                                      <p className="text-gray-500">
                                        Qty {item.amount}
                                      </p>
                                    </div>
                                  </li>
                                ))
                              ) : (
                                <div className="pt-8 pb-4">
                                  Your cart is empty.
                                </div>
                              )}
                            </ul>

                            <button
                              type="submit"
                              className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                              onClick={clearCartHandler}
                            >
                              Checkout
                            </button>

                            <p className="mt-6 text-center">
                              <a
                                href="#"
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                View Shopping Bag
                              </a>
                            </p>
                          </form>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
