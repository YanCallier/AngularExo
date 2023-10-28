import { Component } from '@angular/core';
import axios from 'axios';
import { Expense } from '../model';

@Component({
  selector: 'app-root',
  templateUrl: './expensesList.html',
  styleUrls: ['./expensesList.css'],
})
export class ListComponent {
  expenses: Expense[] = [];
  // expenses: Hero[] = [];

  ngOnInit(): void {
    this.getExpenses();
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
