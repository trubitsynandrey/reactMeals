import React, { createContext, useReducer } from "react";
import { ReducerActions, MealItem, InitialState } from "../types/types";

interface CartContext {
  items: MealItem[];
  totalAmount: number;
  addItem: (item: MealItem) => void;
  removeItem: (id: string) => void;
}

export const CartCtx = createContext<CartContext | null>(null);

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state: InitialState, action: ReducerActions) => {
  if (action.type === "ADD") {
    const updatedtotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    let updatedItems: MealItem[];
    const existingCartItem = state.items[existingItemIndex];
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
        updatedItems = state.items.concat(action.item);
    }
    return { items: updatedItems, totalAmount: updatedtotalAmount };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
    const existingItem = state.items[existingCartItemIndex];
    let updatedItems: MealItem[];
    const updatedTotalAmount = state.totalAmount - existingItem.price
    if (existingItem.amount === 1) {
        updatedItems = state.items.filter(item => item.id !== action.id)
    } else {
        const updatedItem = {...existingItem, amount: existingItem.amount - 1 };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
    }
    return { items: updatedItems, totalAmount: updatedTotalAmount}
  }
  return defaultCartState;
};

export const CartProvider = ({ children }: { children: JSX.Element }) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCart = (item: MealItem) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCart = (id: string) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };
  const cartContext: CartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
  };
  return <CartCtx.Provider value={cartContext}>{children}</CartCtx.Provider>;
};
