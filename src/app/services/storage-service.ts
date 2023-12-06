import { Injectable } from '@angular/core';
import { Expense } from '../model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  private currentPage = 0;
  getCurrentPage = () => this.currentPage;
  setCurrentPage = (pageNumber: number) => (this.currentPage = pageNumber);

  private reloadStop = false;
  getReloadStop = () => this.reloadStop;
  setReloadStop = (realoadStop: boolean) => (this.reloadStop = realoadStop);

  private expenses: Expense[] = [];
  getExpenses = () => this.expenses;
  setExpenses = (expenses: Expense[]) => (this.expenses = expenses);

  private editedExpense: Partial<Expense> | undefined;
  getEditedExpense = () => this.editedExpense;
  setEditedExpense = (expense: Partial<Expense> | undefined) =>
    (this.editedExpense = expense);
}
