import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Expense, Nature } from '../model';
import { getExpenses, appStorage } from '../services';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'expenses-list',
  templateUrl: './expenses-list.html',
  styleUrls: ['./expenses-list.css'],
})
export class ListComponent {
  @Output('editExpense') editExpense: EventEmitter<any> = new EventEmitter();

  currentPage: number = 0;
  rowsBypage: number = 10;

  expenses: Expense[] = [];
  displayedExpense: Expense[] = [];

  ngOnInit(): void {
    getExpenses((response) => {
      this.expenses = response.data.items;
      this.currentPage = appStorage.currentPage;
      this.calcDisplayedExpense(response.data.items, appStorage.currentPage);
    });
  }

  updatePageNumber(pageNumber: number) {
    this.currentPage = pageNumber;
    appStorage.currentPage = pageNumber;
    this.calcDisplayedExpense(this.expenses, pageNumber);
  }

  calcDisplayedExpense(totalExpenses: Expense[], currentPage: number) {
    this.displayedExpense = totalExpenses.slice(
      currentPage * this.rowsBypage,
      currentPage * this.rowsBypage + this.rowsBypage
    );
  }

  addExpense(expense?: Expense): void {
    this.editExpense.emit({ editing: true, expense: expense });
  }

  Nature = Nature;
}
