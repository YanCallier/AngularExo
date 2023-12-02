import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorTracerComponent } from './error-tracer.component';
import { By } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule],
      declarations: [AppComponent, ErrorTracerComponent],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should render app-error-tracer when error is defined', () => {
    const error = new Error('Test error message');
    component.error = error;
    fixture.detectChanges();

    const errorTracerElement = fixture.debugElement.query(
      By.directive(ErrorTracerComponent)
    );
    expect(errorTracerElement).toBeTruthy();
  });
});
