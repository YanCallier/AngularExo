import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './expensesListComponent/expensesList';

@NgModule({
  declarations: [AppComponent, ListComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [ListComponent],
})
export class AppModule {}
