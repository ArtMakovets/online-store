import React, { useReducer } from "react";
import CartContext from "./cart-context";
import {
  initialCartState,
  CartActionTypes,
  cartReducer,
  storageKey,
} from "./cartReducer";

function commitToStorage(data) {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    initialCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: CartActionTypes.ADD, item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: CartActionTypes.REMOVE, id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: CartActionTypes.CLEAR });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  commitToStorage({
    items: cartState.items,
    totalAmount: cartState.totalAmount,
  });

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
