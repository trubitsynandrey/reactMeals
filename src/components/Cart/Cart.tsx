import React from "react";
import styled from "styled-components";
import { Modal } from "../UI/Modal";

const ItemsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 20rem;
  overflow: auto;
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
  const cartItems = (
    <ItemsList>
      {[{ id: "c1", name: "sushi", amount: 2, price: 12.99 }].map((item) => (
        <li>{item.name}</li>
      ))}
    </ItemsList>
  );
  return (
    <Modal>
      <>
        {cartItems}
        <TotalWrapper>
          <span>Total amount</span>
          <span>12,45</span>
        </TotalWrapper>
        <ActionsWrapper>
          <ButtonAlt onClick={hideCartModal}>Close</ButtonAlt>
          <Button>Order</Button>
        </ActionsWrapper>
      </>
    </Modal>
  );
};
