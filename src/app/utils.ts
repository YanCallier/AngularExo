import { Expense, Nature } from './model';

export const currentDate = (): string => {
  const date = new Date(Date.now());
  return date.toISOString().split('T')[0];
};

export function generateRandomExpense(): Expense {
  const natureValues = Object.values(Nature);
  const randomNature =
    natureValues[Math.floor(Math.random() * natureValues.length)];

  const randomExpense: Expense = {
    nature: randomNature,
    id: Math.floor(Math.random() * 1000),
    purchasedOn: generateRandomDate(),
    amount: Math.random() * 1000,
    updatedAt: generateRandomDate(),
    distance: randomNature === Nature.trip ? Math.random() * 1000 : undefined,
    invites:
      randomNature === Nature.restaurant
        ? Math.floor(Math.random() * 3)
        : undefined,
  };

  return randomExpense;
}

function generateRandomDate(): string {
  const startDate = new Date(2022, 0, 1);
  const endDate = new Date();
  const randomDate = new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime())
  );
  return randomDate.toISOString();
}
