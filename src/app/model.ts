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
