import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  private currentPage = 0;

  getCurrentPage = () => this.currentPage;
  setCurrentPage = (pageNumber: number) => (this.currentPage = pageNumber);
}
