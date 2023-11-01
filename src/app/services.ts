import axios, { AxiosResponse } from 'axios';
import { Expense } from './model';

const basUrl = 'http://localhost:3000/expenses';

interface Request {
  method: string;
  url: string;
  data?: Expense;
}

export function getExpenses(callBack: (response: AxiosResponse) => void): void {
  const request = { method: 'GET', url: basUrl };
  serve(request, callBack);
}

export function sendExpense(
  expense: Expense,
  callBack: (response: AxiosResponse) => void
): void {
  const request = {
    method: 'POST',
    url: basUrl,
    data: expense,
  };

  if (expense.id) {
    request.method = 'PUT';
    request.url = `${basUrl}/${expense.id}`;
  }

  serve(request, callBack);
}

function serve(
  request: Request,
  callBack: (response: AxiosResponse) => void
): void {
  axios(request)
    .then((response) => callBack(response))
    .catch((response) => console.log('getExpenses ERROR : ', response));
}
