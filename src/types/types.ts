

export type AddAction = {
  type: "ADD";
  item: MealItem;
};

export type RemoveAction = {
  type: "REMOVE";
  id: string;
};

export type ClearAction = {
    type: "CLEAR";
}

export type InitialState = {
  items: MealItem[];
  totalAmount: number;
};


export type ReducerActions = RemoveAction | AddAction | ClearAction;

export type MealItem = {
  name: string;
  amount: number;
  price: number;
  id: string;
};

export type UserData = {
  name: string;
  street: string;
  city: string;
  postalCode: string;
};
