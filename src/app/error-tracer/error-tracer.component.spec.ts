import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorTracerComponent } from './error-tracer.component';

describe('ErrorTracerComponent', () => {
  let component: ErrorTracerComponent;
  let fixture: ComponentFixture<ErrorTracerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorTracerComponent],
    });
    fixture = TestBed.createComponent(ErrorTracerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
