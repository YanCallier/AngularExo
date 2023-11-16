import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Expense, KeysOfExpense, Nature } from '../model';
import { DataService, appStorage } from '../services';
import { currentDate } from '../utils';
import { Router } from '@angular/router';

@Component({
  selector: 'expense-edit',
  templateUrl: './expense-edit.html',
  styleUrls: ['./expense-edit.css'],
})
export class EditComponent {
  constructor(private dataService: DataService, private router: Router) {}

  data: KeysOfExpense = {};
  title: string = '';
  ngOnInit(): void {
    this.data = appStorage.editedExpense || { purchasedOn: currentDate() };
    this.title = this.data.id ? 'Edition de dépense' : 'Nouvelle dépense';
  }
  onSubmit() {
    console.log('coucou');
    const validExpense: Expense = this.data as Expense;

    this.dataService.sendExpense(validExpense).subscribe((response) => {
      if (!this.data.id) {
        appStorage.currentPage = 0;
      } else {
        const storageIndex = appStorage.expenses.findIndex(
          (expense: Expense) => expense.id === this.data.id
        );
        if (storageIndex > 0) {
          (appStorage.expenses[storageIndex] as Expense) = validExpense;
        }
        appStorage.reloadStop = true;
      }
      this.router.navigate(['/']);
    });
  }

  natureModel = Nature;
  keysOfNature = Object.keys(Nature);
}
