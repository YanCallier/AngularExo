import { Component, EventEmitter, Input, Output } from '@angular/core';
import axios from 'axios';
import { Expense } from '../model';

@Component({
  selector: 'expenses-list',
  templateUrl: './expenses-list.html',
  styleUrls: ['./expenses-list.css'],
})
export class ListComponent {
  @Output('editExpense') editExpense: EventEmitter<any> = new EventEmitter();

  expenses: Expense[] = [];
  ngOnInit(): void {
    this.getExpenses();
  }

  addExpense(expense?: Expense): void {
    this.editExpense.emit({ editing: true, expense: expense });
  }

  getExpenses(): void {
    axios({
      method: 'GET',
      url: 'http://localhost:3000/expenses',
    })
      .then((response) => {
        console.log('ping', response.data.items);
        this.expenses = response.data.items;
      })
      .catch((response) => {
        console.log('getExpenses ERROR : ', response);
      });
  }
}
