import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditComponent } from './expense-edit';
import { Router } from '@angular/router';
import { HttpServices } from '../services/http-services';
import { ErrorService } from '../services/error-service';
import { StorageService } from '../services/storage-service';
import { of, throwError } from 'rxjs';
import { Expense, Nature } from '../model';
import { generateRandomExpense } from '../utils';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let httpServiceSpy: jasmine.SpyObj<HttpServices>;
  let routerSpy: jasmine.SpyObj<Router>;
  let errorServiceSpy: jasmine.SpyObj<ErrorService>;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;

  beforeEach(() => {
    httpServiceSpy = jasmine.createSpyObj('HttpServices', ['sendExpense']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    errorServiceSpy = jasmine.createSpyObj('ErrorService', ['reportError']);
    storageServiceSpy = jasmine.createSpyObj('StorageService', [
      'getEditedExpense',
      'setReloadStop',
      'setCurrentPage',
      'setExpenses',
      'getExpenses',
    ]);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [EditComponent],
      providers: [
        { provide: HttpServices, useValue: httpServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ErrorService, useValue: errorServiceSpy },
        { provide: StorageService, useValue: storageServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize data and title correctly', () => {
      const testExpense = generateRandomExpense();
      storageServiceSpy.getEditedExpense.and.returnValue(testExpense);

      component.ngOnInit();

      expect(component.data).toEqual(testExpense);
      expect(component.title).toEqual('Edition de dépense');
    });

    it('should set title to "Nouvelle dépense" when no id in data', () => {
      storageServiceSpy.getEditedExpense.and.returnValue(undefined);

      component.ngOnInit();

      expect(component.title).toEqual('Nouvelle dépense');
    });
  });

  describe('onSubmit', () => {
    it('should call sendExpense and navigate when successful', () => {
      const testExpense = generateRandomExpense();
      httpServiceSpy.sendExpense.and.returnValue(of(testExpense));
      storageServiceSpy.getExpenses.and.returnValue([]);
      component.onSubmit();

      expect(httpServiceSpy.sendExpense).toHaveBeenCalledOnceWith(
        component.data as Expense
      );
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should call reportError when sendExpense fails', () => {
      const testError = new Error(
        "Une erreur s'est produite lors de l'envoie de données de donnée : ",
        { cause: 'test error' }
      );

      httpServiceSpy.sendExpense.and.returnValue(throwError(() => testError));
      component.onSubmit();

      expect(errorServiceSpy.reportError).toHaveBeenCalledOnceWith(testError);
    });
  });
});
