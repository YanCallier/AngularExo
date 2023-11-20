import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-tracer',
  templateUrl: './error-tracer.component.html',
  styleUrls: ['./error-tracer.component.css'],
})
export class ErrorTracerComponent {
  @Input({ required: true }) error!: Error;
}
