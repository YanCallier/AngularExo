import { Expense } from '../model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
              "Une erreur s'est produite lors de la récupération de données : ",
              { cause: error.message }
            )
        );
      })
    );
  }

  sendExpense(expense: Partial<Expense>): Observable<Expense> {
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
                "Une erreur s'est produite lors de l'envoie de données de donnée : ",
                { cause: error.message }
              )
          );
        })
      );
  }
}
