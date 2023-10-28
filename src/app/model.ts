export class Expense {
  nature!: Nature;
  id!: number;
  purchasedOn!: { type: string; format: Date };
  amount!: number;
  comment!: string;
  distance!: number;
  updatedAt!: { type: string; format: Date };
}

enum Nature {
  'restaurant',
  'trip',
}
