export type AddAction = {
    type: "ADD",
    item: MealItem,
}

export type RemoveAction = {
    type: "REMOVE",
    id: string;
}

export type InitialState = {
    items: MealItem[],
    totalAmount: number,
}

export type ReducerActions = RemoveAction | AddAction

export type MealItem = {
    name: string;
    amount: number,
    price: number;
    id: string;
  };
  