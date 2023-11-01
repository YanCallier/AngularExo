import { Component } from '@angular/core';
import axios from 'axios';
import { Expense, KeysOfExpense } from './model';

const currentDate = (): string => {
  const date = new Date(Date.now());
  return date.toISOString().split('T')[0];
};
const emptyExpense: KeysOfExpense = { purchasedOn: currentDate() };
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  editing = false;
  editedExpense = emptyExpense;

  editExpense(data: { editing: boolean; expense?: Expense }): void {
    this.editing = data.editing;
    if (data.expense) {
      this.editedExpense = data.expense;
    } else {
      this.editedExpense = emptyExpense;
    }
  }
}
