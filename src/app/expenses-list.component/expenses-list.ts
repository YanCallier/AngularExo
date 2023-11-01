import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Expense, Nature } from '../model';
import { getExpenses } from '../services';

@Component({
  selector: 'expenses-list',
  templateUrl: './expenses-list.html',
  styleUrls: ['./expenses-list.css'],
})
export class ListComponent {
  @Output('editExpense') editExpense: EventEmitter<any> = new EventEmitter();

  expenses: Expense[] = [];
  ngOnInit(): void {
    getExpenses((response) => (this.expenses = response.data.items));
  }

  addExpense(expense?: Expense): void {
    this.editExpense.emit({ editing: true, expense: expense });
  }

  Nature = Nature;
}
