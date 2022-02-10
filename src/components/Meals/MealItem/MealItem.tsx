import React from "react";
import styled from "styled-components";
import { MealItemForm } from "./MealItemForm"

type MealtItemProps = {
  name: string;
  description: string;
  price: number;
  id: string;
};

const Meal = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ccc;
  & h3 {
    margin: 0 0 0.25rem 0;
  }
`;

const Price = styled.div`
    margin-top: 0.25rem;
  font-weight: bold;
  color: #ad5502;
  font-size: 1.25rem;
`
export const MealItem = ({ name, description, price, id }: MealtItemProps) => {
  const priceBill = `$${price.toFixed(2)}`;
  return (
    <Meal>
      <div>
        <h3>{name}</h3>
        <div style={{fontStyle: "italic"}}>{description}</div>
        <Price>{priceBill}</Price>
      </div>
      <div>
        <MealItemForm id={id}/>
      </div>
    </Meal>
  );
};
