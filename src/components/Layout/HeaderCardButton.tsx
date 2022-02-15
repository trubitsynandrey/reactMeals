import React, { useContext, useState, useEffect } from "react";
import { CartCtx } from "../../store/CartContext";
import { CartIcon } from "../Cart/CartIcon";
import styled from "styled-components";

const Badge = styled.span`
  background-color: #b94517;
  padding: 0.25rem 1rem;
  border-radius: 25px;
  margin-left: 1rem;
  font-weight: bold;
`;

const CartButton = styled.button<{ bumped: boolean }>`
  cursor: pointer;
  font: inherit;
  border: none;
  background-color: #4d1601;
  color: white;
  padding: 0.75rem 3rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 25px;
  font-weight: bold;
  &:hover,
  &:active {
    background-color: #2c0d00;
  }
  &:hover ${Badge}, &:active ${Badge} {
    background-color: #92320c;
  }
  animation: ${({bumped}) => (bumped ? `bump 300ms ease-out` : "")};
  @keyframes bump {
    0% {
      transform: scale(1);
    }
    10% {
      transform: scale(0.9);
    }
    30% {
      transform: scale(1.1);
    }
    50% {
      transform: scale(1.15);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const IconWrapper = styled.span`
  width: 1.35rem;
  height: 1.35rem;
  margin-right: 0.5rem;
`;

export const HeaderCardButton = ({
  showCartModal,
}: {
  showCartModal: () => void;
}) => {
  const CartContext = useContext(CartCtx);
  const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);

  const { items } = CartContext!;
  const numberOfCartItems = items.reduce(
    (curNumber, item) => curNumber + item.amount,
    0
  );
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setButtonIsHighlighted(true);
    const timer = setTimeout(() => {
      setButtonIsHighlighted(false);
    }, 300);
    return () => {
      clearInterval(timer);
    };
  }, [items]);
  return (
    <CartButton onClick={showCartModal} bumped={buttonIsHighlighted}>
      <IconWrapper>
        <CartIcon />
      </IconWrapper>
      <span>Your cart</span>
      <Badge>{numberOfCartItems}</Badge>
    </CartButton>
  );
};
