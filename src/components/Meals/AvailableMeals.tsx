import React from "react";
import styled from "styled-components";
import { Card } from "../UI/Card";
import { MealItem } from "./MealItem/MealItem";

type dummyMeals = {
  id: string;
  name: string;
  description: string;
  price: number;
};

const DUMMY_MEALS: dummyMeals[] = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

const MealsSection = styled.section`
  max-width: 60rem;
  width: 90%;
  margin: 2rem auto;
  animation: meals-appear 1s ease-out forwards;
  & ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  @keyframes meals-appear {
    from {
      opacity: 0;
      transform: translateY(3rem);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const AvailableMeals = () => {
  const mealList = DUMMY_MEALS.map((item) => (
    <MealItem
      key={item.id}
      id={item.id}
      name={item.name}
      description={item.description}
      price={item.price}
    />
  ));
  return (
    <MealsSection>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </MealsSection>
  );
};
