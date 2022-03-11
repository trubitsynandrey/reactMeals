import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Modal } from "../UI/Modal";
import { CartCtx } from "../../store/CartContext";
import { CartItem } from "./CartItem";
import { MealItem } from "../../types/types";
import { Checkout } from "./Checkout";
import { UserData } from "../../types/types";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [isCheckout, setIsCheckout] = useState<boolean>(false);
  const CartContext = useContext(CartCtx);
  const totalAmount = `$${CartContext?.totalAmount.toFixed(2)}`;
  const hasItems = CartContext && CartContext?.items.length > 0;
  const addCartItem = (item: MealItem) => {
    CartContext?.addItem({ ...item, amount: 1 });
  };
  const removeCartItem = (id: string) => {
    CartContext?.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHadler = async (UserData: UserData) => {
    setIsSubmitting(true);
    await fetch(
      "https://reactmealapp-6ceb4-default-rtdb.europe-west1.firebasedatabase.app/order.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: UserData,
          orderedItems: CartContext?.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    CartContext?.clearCart()
  };

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

  const modalActions = (
    <ActionsWrapper>
      <ButtonAlt onClick={hideCartModal}>Close</ButtonAlt>
      {hasItems && <Button onClick={orderHandler}>Order</Button>}
    </ActionsWrapper>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <TotalWrapper>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </TotalWrapper>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHadler} hideCartModal={hideCartModal} />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const isSubmittingContent = <p>sending your order</p>;
  const didSubmitModalContent = (
    <>
      <p>Succesfully send the order</p>
      <ActionsWrapper>
        <Button onClick={hideCartModal}>Close</Button>
      </ActionsWrapper>
    </>
  );
  return (
    <Modal onClose={hideCartModal}>
      <>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingContent}
        {didSubmit && didSubmitModalContent}
      </>
    </Modal>
  );
};
