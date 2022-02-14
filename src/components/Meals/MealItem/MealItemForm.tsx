import React, { useRef, useState } from "react";
import styled from "styled-components";
import Input from "../../UI/Input";

const Form = styled.form`
  text-align: right;
  & button {
    font: inherit;
    cursor: pointer;
    background-color: #8a2b06;
    border: 1px solid #8a2b06;
    color: white;
    padding: 0.25rem 2rem;
    border-radius: 20px;
    font-weight: bold;
    & button:hover,
    & button:active {
      background-color: #641e03;
      border-color: #641e03;
    }
  }
`;

type MealItemFormProps = {
  id: string,
  addToCart: (amount: number) => void,
}

export const MealItemForm = ({ id, addToCart }: MealItemFormProps) => {
  const [isAmountValid, setIsAmountValid] = useState(true);
  const amountInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredAmount = amountInputRef.current?.value;
    const numberEnteredAmount = +enteredAmount!;
    if (
      enteredAmount?.trim().length === 0 ||
      numberEnteredAmount > 5 ||
      numberEnteredAmount < 1
    ) {
      setIsAmountValid(false)
      return;
    }
    addToCart(numberEnteredAmount)
  };

  return (
    <Form onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!isAmountValid && <p>Please enter a valid amount</p>}
    </Form>
  );
};
