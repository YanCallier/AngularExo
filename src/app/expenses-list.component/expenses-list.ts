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

  currentPage: number = appStorage.currentPage;
  rowsBypage: number = 10;
  lastPage: number = Math.round(appStorage.expenses.length / this.rowsBypage);

  displayedExpense: Expense[] = this.calcDisplayedExpense(
    appStorage.expenses,
    appStorage.currentPage
  );

  calcDisplayedExpense(
    totalExpenses: Expense[],
    currentPage: number
  ): Expense[] {
    return totalExpenses.slice(
      currentPage * this.rowsBypage,
      currentPage * this.rowsBypage + this.rowsBypage
    );
  }

  ngOnInit(): void {
    this.currentPage = appStorage.currentPage;
    if (appStorage.reloadStop) {
      appStorage.reloadStop = false;
    } else {
      getExpenses((response) => {
        appStorage.expenses = response.data.items;
        this.lastPage = Math.round(
          response.data.items.length / this.rowsBypage
        );

        this.displayedExpense = this.calcDisplayedExpense(
          response.data.items,
          appStorage.currentPage
        );
      });
    }
  }

  updatePageNumber(pageNumber: number) {
    this.currentPage = pageNumber;
    appStorage.currentPage = pageNumber;
    this.displayedExpense = this.calcDisplayedExpense(
      appStorage.expenses,
      pageNumber
    );
  }

  addExpense(expense?: Expense): void {
    this.editExpense.emit({ editing: true, expense: expense });
  }

  Nature = Nature;
}
