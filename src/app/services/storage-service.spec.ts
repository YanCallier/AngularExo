import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage-service';
import { generateRandomExpense } from '../utils';

describe('serviceService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService],
    });
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get current page', () => {
    service.setCurrentPage(42);
    expect(service.getCurrentPage()).toBe(42);
  });

  it('should set and get reload stop', () => {
    service.setReloadStop(true);
    expect(service.getReloadStop()).toBe(true);
  });

  it('should set and get expenses', () => {
    const testExpenses = [generateRandomExpense(), generateRandomExpense()];
    service.setExpenses(testExpenses);
    expect(service.getExpenses()).toEqual(testExpenses);
  });

  it('should set and get edited expense', () => {
    const testEditedExpense = { ...generateRandomExpense(), id: undefined };
    service.setEditedExpense(testEditedExpense);
    expect(service.getEditedExpense()).toEqual(testEditedExpense);
  });
});
