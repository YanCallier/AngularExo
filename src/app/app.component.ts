import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'myTest';

  ping(): void {
    axios({
      method: 'OPTIONS',
      url: 'http://localhost:3000/',
    }).then(function (response) {
      console.log('ping', response);
    });
  }
}
