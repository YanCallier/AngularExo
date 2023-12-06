import { Component } from '@angular/core';
import { Expense, Nature } from '../model';
import { HttpServices } from '../services/http-services';
import { currentDate } from '../utils';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { ErrorService } from '../services/error-service';
import { StorageService } from '../services/storage-service';

@Component({
  selector: 'expense-edit',
  templateUrl: './expense-edit.html',
  styleUrls: ['./expense-edit.css'],
})
export class EditComponent {
  constructor(
    private httpService: HttpServices,
    private router: Router,
    private errorService: ErrorService,
    private storageService: StorageService
  ) {}

  data: Partial<Expense> = {};
  title: string = '';
  ngOnInit(): void {
    this.data = this.storageService.getEditedExpense() || {
      purchasedOn: currentDate(),
    };
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
            this.storageService.setCurrentPage(0);
          } else {
            const expenses = this.storageService.getExpenses();
            const storageIndex = expenses.findIndex(
              (expense: Expense) => expense.id === this.data.id
            );
            if (storageIndex > 0) {
              expenses[storageIndex] = validExpense;
              this.storageService.setExpenses(expenses);
            }
            this.storageService.setReloadStop(true);
          }
          this.router.navigate(['/']);
        })
      )
      .subscribe();
  }

  natureModel = Nature;
  keysOfNature = Object.keys(Nature);
}
