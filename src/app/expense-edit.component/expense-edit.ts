import { Component, EventEmitter, Input, Output } from '@angular/core';
import axios from 'axios';
import { Expense, KeysOfExpense, Nature } from '../model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'expense-edit',
  templateUrl: './expense-edit.html',
  styleUrls: ['./expense-edit.css'],
})
export class EditComponent {
  @Input({ required: true }) editedExpense!: KeysOfExpense;
  @Output('editExpense') editExpense: EventEmitter<any> = new EventEmitter();

  data: KeysOfExpense = {};
  title: string = '';
  ngOnInit(): void {
    this.data = this.editedExpense;
    this.title = this.editedExpense.id
      ? 'Edition de dépense'
      : 'Nouvelle dépense';
  }
  onSubmit() {
    this.addExpenses();
  }

  natureModel = Nature;
  addExpenses(): void {
    let url = 'http://localhost:3000/expenses';
    if (this.data.id) {
      url += `/${this.data.id}`;
    }
    axios({
      method: this.data.id ? 'PUT' : 'POST',
      url: url,
      data: this.data,
    })
      .then((response) => {
        console.log('ping', response.data.items);
        this.editExpense.emit();
      })
      .catch((response) => {
        console.log('getExpenses ERROR : ', response);
      });
  }
}
