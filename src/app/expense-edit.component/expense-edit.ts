import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Expense, KeysOfExpense, Nature } from '../model';
import { appStorage, sendExpense } from '../services';

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
    const validExpense: Expense = this.data as Expense;
    sendExpense(validExpense, () => {
      if (!this.data.id) {
        appStorage.currentPage = 0;
      } else {
        const storageIdex = appStorage.expenses.findIndex(
          (expense: Expense) => expense.id === this.data.id
        );
        if (storageIdex > 0) {
          (appStorage.expenses[storageIdex] as Expense) = validExpense;
        }
        appStorage.reloadStop = true;
      }
      this.editExpense.emit();
    });
  }

  natureModel = Nature;
  keysOfNature = Object.keys(Nature);
}
