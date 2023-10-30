import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  editing = false;
  editExpense(editing: boolean, id?: number): void {
    this.editing = editing;
    console.log('function call in the parent: ', this.editing);
  }

  ping(): void {
    axios({
      method: 'OPTIONS',
      url: 'http://localhost:3000/',
    }).then(function (response) {
      console.log('ping', response);
    });
  }
}
