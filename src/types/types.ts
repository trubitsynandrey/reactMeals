export type AddAction = {
    type: "ADD",
    item: MealtItem,
}

export type RemoveAction = {
    type: "REMOVE",
    id: number;
}

export type InitialState = {
    items: MealtItem[],
    totalAmount: number,
}

export type ReducerActions = RemoveAction | AddAction

export type MealtItem = {
    name: string;
    amount: number,
    price: number;
    id: string;
  };
  