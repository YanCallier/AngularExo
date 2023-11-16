import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './expenses-list.component/expenses-list';
import { EditComponent } from './expense-edit.component/expense-edit';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'editing', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
