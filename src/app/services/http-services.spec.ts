import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpServices, baseUrl } from './http-services';
import { Expense, Nature } from '../model';
import { generateRandomExpense } from '../utils';

describe('HttpService', () => {
  let service: HttpServices;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpServices],
    });

    service = TestBed.inject(HttpServices);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const testExpense: Expense = generateRandomExpense();

  it('should send an expense via POST when no ID is provided', () => {
    const newExpense = { ...testExpense, id: undefined };
    service.sendExpense(newExpense).subscribe((expense) => {
      expect(expense).toEqual(testExpense);
    });

    const req = httpTestingController.expectOne(baseUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(testExpense);
  });
  it('should send an expense via PUT when ID is provided', () => {
    service.sendExpense(testExpense).subscribe((expense) => {
      expect(expense).toEqual(testExpense);
    });

    const req = httpTestingController.expectOne(`${baseUrl}/${testExpense.id}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(testExpense);
  });

  it('should retrieve expenses from the API via GET', () => {
    const testExpenses: { items: Expense[] } = {
      items: [
        testExpense,
        { ...testExpense, nature: Nature.restaurant, invites: 5 },
        { ...testExpense, distance: 10, amount: 142 },
      ],
    };

    service.getExpenses().subscribe((expenses) => {
      expect(expenses).toEqual(testExpenses);
    });

    const req = httpTestingController.expectOne(baseUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testExpenses);
  });
});
