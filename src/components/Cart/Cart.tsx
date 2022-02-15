import React, { useContext } from "react";
import styled from "styled-components";
import { Modal } from "../UI/Modal";
import { CartCtx } from "../../store/CartContext";
import { CartItem } from "./CartItem";
import { MealItem } from "../../types/types";

const ItemsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 20rem;
  overflow: scroll;
`;

const TotalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  margin: 1rem 0;
`;

const ActionsWrapper = styled.div`
  text-align: right;
  & button {
    font: inherit;
    cursor: pointer;
    border: 1px solid #8a2b06;
    padding: 0.5rem 2rem;
    border-radius: 25px;
    margin-left: 1rem;
  }
  & button:hover,
  & button:active {
    background-color: #5a1a01;
    border-color: #5a1a01;
    color: white;
  }
`;

const ButtonAlt = styled.button`
  background-color: transparent;
`;

const Button = styled.button`
  background-color: #8a2b06;
  color: white;
`;

type CartProps = {
  hideCartModal: () => void;
};

export const Cart = ({ hideCartModal }: CartProps) => {
  const CartContext = useContext(CartCtx);
  const totalAmount = `$${CartContext?.totalAmount.toFixed(2)}`;
  const hasItems = CartContext && CartContext?.items.length > 0;
  const addCartItem = (item: MealItem) => {
    CartContext?.addItem({ ...item, amount: 1})
  }
  const removeCartItem = (id: string) => {
    CartContext?.removeItem(id);
  }
  const cartItems = (
    <ItemsList>
      {CartContext?.items.map((item: MealItem) => (
        <CartItem
          key={item.id}
          item={item}
          price={item.price}
          name={item.name}
          amount={item.amount}
          onRemove={removeCartItem}
          onAdd={addCartItem}
          id={item.id}
        />
      ))}
    </ItemsList>
  );
  return (
    <Modal>
      <>
        {cartItems}
        <TotalWrapper>
          <span>Total amount</span>
          <span>{totalAmount}</span>
        </TotalWrapper>
        <ActionsWrapper>
          <ButtonAlt onClick={hideCartModal}>Close</ButtonAlt>
          {hasItems && <Button>Order</Button>}
        </ActionsWrapper>
      </>
    </Modal>
  );
};
