import { Component } from '@angular/core';
import { Expense, KeysOfExpense, Nature } from '../model';
import { HttpServices, appStorage } from '../services';
import { currentDate } from '../utils';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service.service';

@Component({
  selector: 'expense-edit',
  templateUrl: './expense-edit.html',
  styleUrls: ['./expense-edit.css'],
})
export class EditComponent {
  constructor(
    private httpService: HttpServices,
    private router: Router,
    private errorService: ErrorService
  ) {}

  data: KeysOfExpense = {};
  title: string = '';
  ngOnInit(): void {
    this.data = appStorage.editedExpense || { purchasedOn: currentDate() };
    this.title = this.data.id ? 'Edition de dépense' : 'Nouvelle dépense';
  }
  onSubmit() {
    const validExpense: Expense = this.data as Expense;

    this.httpService
      .sendExpense(validExpense)
      .pipe(
        catchError((error) => {
          this.errorService.reportError(error);
          return throwError(() => error);
        }),
        tap((response) => {
          if (!this.data.id) {
            appStorage.currentPage = 0;
          } else {
            const storageIndex = appStorage.expenses.findIndex(
              (expense: Expense) => expense.id === this.data.id
            );
            if (storageIndex > 0) {
              (appStorage.expenses[storageIndex] as Expense) = validExpense;
            }
            appStorage.reloadStop = true;
          }
          this.router.navigate(['/']);
        })
      )
      .subscribe();
  }

  natureModel = Nature;
  keysOfNature = Object.keys(Nature);
}
