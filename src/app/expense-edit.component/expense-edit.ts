import { Component, EventEmitter, Output } from '@angular/core';
import axios from 'axios';
import { Expense, Nature } from '../model';
import { NgForm } from '@angular/forms';

// This make the Expense properties optional
type KeysOfExpense = {
  [K in keyof Expense]?: Expense[K];
};

@Component({
  selector: 'expense-edit',
  templateUrl: './expense-edit.html',
  styleUrls: ['./expense-edit.css'],
})
export class EditComponent {
  @Output('editExpense') editExpense: EventEmitter<any> = new EventEmitter();

  ngOnInit(form: NgForm): void {
    // form.resetForm();
    // form.setValue(null:['amount']);
  }
  onSubmit() {
    this.addExpenses();
    console.log(
      {
        nature: 'trip',
        amount: 965,
        comment: 'Enim maioren.',
        purchasedOn: '2022-05-12',
        distance: 988,
      },
      this.model
    );
  }

  currentDate = (): string => {
    const date = new Date(Date.now());
    return date.toISOString().split('T')[0];
  };

  model: KeysOfExpense = { purchasedOn: this.currentDate() };

  natureModel = Nature;
  addExpenses(): void {
    const test = this.model;
    axios
      .post('http://localhost:3000/expenses', test)
      .then((response) => {
        console.log('ping', response.data.items);
        this.editExpense.emit();
      })
      .catch((response) => {
        console.log('getExpenses ERROR : ', response);
      });
  }
}
