import { Expense, KeysOfExpense } from '../model';
import {
  HttpClient,
  HttpErrorResponse,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

export const baseUrl = 'http://localhost:3000/expenses';

@Injectable({
  providedIn: 'root',
})
export class HttpServices {
  constructor(private http: HttpClient) {}

  getExpenses(): Observable<{ items: Expense[] }> {
    return this.http.get<{ items: Expense[] }>(baseUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(
          () =>
            new Error(
              "La récupération de données s'est mal passé. Veuillez réessayer plus tard.",
              { cause: error.message }
            )
        );
      })
    );
  }

  sendExpense(expense: Expense): Observable<Expense> {
    return this.http
      .request<Expense>(
        expense.id ? 'PUT' : 'POST',
        expense.id ? `${baseUrl}/${expense.id}` : baseUrl,
        { body: expense }
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(
            () =>
              new Error(
                "L'envoie de données s'est mal passé. Veuillez réessayer plus tard.",
                { cause: error.message }
              )
          );
        })
      );
  }
}

interface AppStoragePropeties {
  expenses: Expense[];
  reloadStop: boolean;
  editedExpense?: KeysOfExpense;
}
export const appStorage: AppStoragePropeties = {
  expenses: [],
  reloadStop: false,
};
