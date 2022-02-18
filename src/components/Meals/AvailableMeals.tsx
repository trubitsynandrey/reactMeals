import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Card } from "../UI/Card";
import { MealItem } from "./MealItem/MealItem";

type Meals = {
  id: string;
  name: string;
  description: string;
  price: number;
};

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
  const [meals, setMeals] = useState<Meals[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState(undefined);
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://reactmealapp-6ceb4-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const parsedData = await response.json();
      const loadedMeals = [];
      for (const key in parsedData) {
        loadedMeals.push({ ...parsedData[key], id: key });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return <h2 style={{ textAlign: "center", color: "white" }}>Loading...</h2>;
  }

  if (httpError) {
    return <h2 style={{ textAlign: "center", color: "red" }}>{httpError}</h2>;
  }
  const mealList = meals.map((item) => (
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
