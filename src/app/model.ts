export interface Expense {
  nature: Nature;
  id: number;
  purchasedOn: string;
  amount: number;
  updatedAt: string;
  distance?: number;
  invites?: number;
  comment?: string;
}

export enum Nature {
  restaurant = 'restaurant',
  trip = 'trip',
}

// This make the Expense properties optional, to use it in empty form
export type KeysOfExpense = {
  [K in keyof Expense]?: Expense[K];
};
