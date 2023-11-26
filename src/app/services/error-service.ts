import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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
