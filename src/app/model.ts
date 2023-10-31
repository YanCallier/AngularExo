export class Expense {
  constructor(
    public nature: Nature,
    public id: number,
    public purchasedOn: string,
    public amount: number,
    public updatedAt: string,
    public distance?: number,
    public invites?: number,
    public comment?: string
  ) {}
}

export enum Nature {
  restaurant = 'restaurant',
  trip = 'trip',
}

// This make the Expense properties optional, to use it in empty form
export type KeysOfExpense = {
  [K in keyof Expense]?: Expense[K];
};
