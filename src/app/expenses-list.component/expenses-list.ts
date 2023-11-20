import { Component, EventEmitter, Output } from '@angular/core';
import { Expense, Nature } from '../model';
import { appStorage, HttpServices } from '../services';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service.service';

@Component({
  selector: 'expenses-list',
  templateUrl: './expenses-list.html',
  styleUrls: ['./expenses-list.css'],
})
export class ListComponent {
  constructor(
    private httpService: HttpServices,
    private router: Router,
    private errorService: ErrorService
  ) {}

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
      this.httpService
        .getExpenses()
        .pipe(
          catchError((error) => {
            this.errorService.reportError(error);
            return throwError(() => error);
          }),
          tap((result) => {
            appStorage.expenses = result.items;
            this.displayedExpense = this.calcDisplayedExpense(
              result.items,
              appStorage.currentPage
            );
          })
        )
        .subscribe();
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
