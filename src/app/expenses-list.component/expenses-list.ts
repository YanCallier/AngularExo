import { Component } from '@angular/core';
import { Expense, Nature } from '../model';
import { HttpServices } from '../services/http-services';
import { Router } from '@angular/router';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { ErrorService } from '../services/error-service';
import { StorageService } from '../services/storage-service';

@Component({
  selector: 'expenses-list',
  templateUrl: './expenses-list.html',
  styleUrls: ['./expenses-list.css'],
})
export class ListComponent {
  constructor(
    private httpService: HttpServices,
    private router: Router,
    private errorService: ErrorService,
    private storageService: StorageService
  ) {}

  currentPage: number = this.storageService.getCurrentPage();
  rowsBypage: number = 10;
  expenses = this.storageService.getExpenses();
  Nature = Nature; // this is needed to use it in html form

  ngOnInit(): void {
    this.currentPage = this.storageService.getCurrentPage();
    if (this.storageService.getReloadStop()) {
      this.storageService.setReloadStop(false);
      this.expenses = this.storageService.getExpenses();
    } else {
      this.httpService
        .getExpenses()
        .pipe(
          catchError((error) => {
            this.errorService.reportError(error);
            return throwError(() => error);
          }),
          tap((result) => {
            this.expenses = result.items;
            this.storageService.setExpenses(result.items);
          }),
          finalize(() => {
            this.displayedExpense = this.calcDisplayedExpense(
              this.expenses,
              this.currentPage
            );
          })
        )
        .subscribe();
    }
  }

  lastPage: () => number = () =>
    Math.round(this.expenses.length / this.rowsBypage);
  displayedExpense: Expense[] = [];

  calcDisplayedExpense(
    totalExpenses: Expense[],
    currentPage: number
  ): Expense[] {
    return totalExpenses.slice(
      currentPage * this.rowsBypage,
      currentPage * this.rowsBypage + this.rowsBypage
    );
  }

  updatePageNumber(pageNumber: number) {
    this.currentPage = pageNumber;
    this.storageService.setCurrentPage(pageNumber);
    this.displayedExpense = this.calcDisplayedExpense(
      this.expenses,
      pageNumber
    );
  }

  editeExpense(expense?: Expense): void {
    this.storageService.setEditedExpense(expense);
    this.router.navigate(['/editing']);
  }
}
