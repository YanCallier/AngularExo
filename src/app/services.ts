import { Expense, KeysOfExpense } from './model';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

const baseUrl = 'http://localhost:3000/expenses';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getExpenses(): Observable<{ items: Expense[] }> {
    return this.http.get<{ items: Expense[] }>(baseUrl);
  }

  sendExpense(expense: Expense): Observable<Expense> {
    return this.http.request<Expense>(
      expense.id ? 'PUT' : 'POST',
      expense.id ? `${baseUrl}/${expense.id}` : baseUrl,
      { body: expense }
    );
  }
}

interface AppStoragePropeties {
  currentPage: number;
  expenses: Expense[];
  reloadStop: boolean;
  editedExpense?: KeysOfExpense;
}
export const appStorage: AppStoragePropeties = {
  currentPage: 0,
  expenses: [],
  reloadStop: false,
};
