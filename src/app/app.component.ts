import { Component, OnInit } from '@angular/core';
import { appStorage } from './services';
import { ErrorService } from './services/error.service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  error?: Error;
  constructor(private errorService: ErrorService) {}
  ngOnInit(): void {
    this.errorService.error$.subscribe((error) => {
      this.error = error;
      console.error('Error : ', error);
    });
  }
}
