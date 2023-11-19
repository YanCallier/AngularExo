import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './expenses-list.component/expenses-list';
import { EditComponent } from './expense-edit.component/expense-edit';
import { EditModule } from './expense-edit.module';

const routes: Routes = [
  { path: '', component: ListComponent },
  // { path: 'editing', component: EditComponent },
  {
    path: 'editing',
    loadChildren: () =>
      import('./expense-edit.module').then((m) => {
        console.log('cest pas grave');
        return m.EditModule;
      }),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
