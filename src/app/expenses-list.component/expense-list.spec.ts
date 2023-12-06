import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ListComponent } from './expenses-list';
import { HttpServices } from '../services/http-services';
import { ErrorService } from '../services/error-service';
import { StorageService } from '../services/storage-service';
import { of, catchError, tap, throwError } from 'rxjs';

import { generateRandomExpense } from '../utils';
import { Router } from '@angular/router';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let httpServiceSpy: jasmine.SpyObj<HttpServices>;
  let errorServiceSpy: jasmine.SpyObj<ErrorService>;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;

  beforeEach(() => {
    const httpSpy = jasmine.createSpyObj('HttpServices', ['getExpenses']);
    const errorSpy = jasmine.createSpyObj('ErrorService', ['reportError']);
    const storageSpy = jasmine.createSpyObj('StorageService', [
      'getExpenses',
      'setExpenses',
      'setCurrentPage',
      'getReloadStop',
      'setReloadStop',
      'getCurrentPage',
      'setEditedExpense',
    ]);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ListComponent],
      providers: [
        { provide: HttpServices, useValue: httpSpy },
        { provide: ErrorService, useValue: errorSpy },
        { provide: StorageService, useValue: storageSpy },
      ],
    });

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    httpServiceSpy = TestBed.inject(
      HttpServices
    ) as jasmine.SpyObj<HttpServices>;
    errorServiceSpy = TestBed.inject(
      ErrorService
    ) as jasmine.SpyObj<ErrorService>;
    storageServiceSpy = TestBed.inject(
      StorageService
    ) as jasmine.SpyObj<StorageService>;
  });

  const EXPENSES = new Array(111).fill(true).map(() => generateRandomExpense());

  it('should call getExpenses on ngOnInit if reloadStop is false', fakeAsync(() => {
    storageServiceSpy.getReloadStop.and.returnValue(false);
    httpServiceSpy.getExpenses.and.returnValue(of({ items: EXPENSES }));

    component.ngOnInit();
    tick();

    expect(httpServiceSpy.getExpenses).toHaveBeenCalled();
    expect(storageServiceSpy.setExpenses).toHaveBeenCalledWith(EXPENSES);
    expect(component.expenses).toEqual(EXPENSES);
    // expect(component.displayedExpense).toEqual(EXPENSES);
  }));

  it('should handle errors during getExpenses', async () => {
    const testError = new Error(
      "Une erreur s'est produite lors de l'envoie de données de donnée : ",
      { cause: 'test error' }
    );

    storageServiceSpy.getReloadStop.and.returnValue(false);
    httpServiceSpy.getExpenses.and.returnValue(throwError(() => testError));

    await component.ngOnInit();

    expect(errorServiceSpy.reportError).toHaveBeenCalledOnceWith(testError);
  });

  it('should update currentPage and displayedExpense on updatePageNumber', () => {
    component.expenses = EXPENSES;
    component.updatePageNumber(2);

    expect(storageServiceSpy.setCurrentPage).toHaveBeenCalledWith(2);
    expect(component.currentPage).toBe(2);
    expect(component.calcDisplayedExpense).toHaveBeenCalled;
    expect(component.displayedExpense).toContain(EXPENSES[25]);
  });

  it('should set editedExpense in storageService and navigate on editeExpense', () => {
    const routerSpy = spyOn(TestBed.inject(Router), 'navigate');
    component.editeExpense(EXPENSES[0]);

    expect(storageServiceSpy.setEditedExpense).toHaveBeenCalledWith(
      EXPENSES[0]
    );
    expect(routerSpy).toHaveBeenCalledWith(['/editing']);
  });
});
