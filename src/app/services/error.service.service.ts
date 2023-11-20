import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errorSubject = new Subject<Error>();

  error$ = this.errorSubject.asObservable();

  reportError(error: Error): void {
    this.errorSubject.next(error);
  }
}
