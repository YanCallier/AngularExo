import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Expense, Nature } from '../model';
import { appStorage, DataService } from '../services';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'expenses-list',
  templateUrl: './expenses-list.html',
  styleUrls: ['./expenses-list.css'],
})
export class ListComponent {
  @Output('editExpense') editExpense: EventEmitter<any> = new EventEmitter();
  constructor(private dataService: DataService) {}

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
      this.dataService.getExpenses().subscribe((result) => {
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
    this.editExpense.emit({ editing: true, expense: expense });
  }

  Nature = Nature;
}
