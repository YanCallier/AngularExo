import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ListComponent } from './expenses-list.component/expenses-list';
import { EditComponent } from './expense-edit.component/expense-edit';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { DataService } from './services';

@NgModule({
  declarations: [AppComponent, ListComponent, EditComponent],
  imports: [BrowserModule, FormsModule, CommonModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
