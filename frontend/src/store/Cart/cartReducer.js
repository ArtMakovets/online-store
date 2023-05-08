const storageKey = "cartData";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

let initialCartState =
  JSON.parse(localStorage.getItem(storageKey)) ?? defaultCartState;

const CartActionTypes = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  CLEAR: "CLEAR",
};

const findItem = (cart, itemId) => cart.find((item) => item.itemId === itemId);

const cartReducer = (state, action) => {
  if (action.type === CartActionTypes.ADD) {
    const itemAmount = action.item.amount;

    const updatedTotalAmount =
      state.totalAmount + action.item.price * itemAmount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + itemAmount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === CartActionTypes.REMOVE) {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === CartActionTypes.CLEAR) {
    localStorage.removeItem(storageKey);
    return {
      ...defaultCartState,
    };
  }

  return initialCartState;
};

export { cartReducer, initialCartState, CartActionTypes, storageKey };
