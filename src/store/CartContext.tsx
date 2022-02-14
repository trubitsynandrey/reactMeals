import React, {createContext, useReducer} from 'react'
import { ReducerActions, MealtItem, InitialState } from '../types/types';

interface CartContext {
    items: MealtItem[];
    totalAmount: number;
    addItem: (item: MealtItem) => void;
    removeItem: (id: number) => void;
}

export const CartCtx = createContext<CartContext | null>(null)

const defaultCartState = {
    items: [],
    totalAmount: 0,
}
const cartReducer = (state: InitialState, action: ReducerActions) => {
    if (action.type === "ADD") {
        const updatedItems = state.items.concat(action.item)
        const updatedtotalAmount = state.totalAmount + action.item.price * action.item.amount;
        return { items: updatedItems, totalAmount: updatedtotalAmount}
    }
    return defaultCartState
};

export const CartProvider = ({children}: {children: JSX.Element}) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)
    const addItemToCart = (item: MealtItem) => {
        dispatchCartAction({type: "ADD", item: item})
    }

    const removeItemFromCart = (id: number) => {
        dispatchCartAction({type: "REMOVE", id: id})
    }
    const cartContext: CartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCart,
        removeItem: removeItemFromCart,
    }
    return <CartCtx.Provider value={cartContext}>
        {children}
    </CartCtx.Provider>
}