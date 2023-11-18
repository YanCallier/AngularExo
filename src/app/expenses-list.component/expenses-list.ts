import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Expense, KeysOfExpense, Nature } from '../model';
import { appStorage, HttpServices } from '../services';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { currentDate } from '../utils';

@Component({
  selector: 'expenses-list',
  templateUrl: './expenses-list.html',
  styleUrls: ['./expenses-list.css'],
})
export class ListComponent {
  constructor(private httpService: HttpServices, private router: Router) {}

  currentPage: number = appStorage.currentPage;
  rowsBypage: number = 10;
  lastPage: () => number = () =>
    Math.round(appStorage.expenses.length / this.rowsBypage);

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
      this.httpService.getExpenses().subscribe((result) => {
        appStorage.expenses = result.items;
        this.displayedExpense = this.calcDisplayedExpense(
          result.items,
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
    appStorage.editedExpense = expense;
    this.router.navigate(['/editing']);
  }

  Nature = Nature;
}
