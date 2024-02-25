import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './expenses-list.component/expenses-list';

const routes: Routes = [
  { path: '', component: ListComponent },
  {
    path: 'editing',
    loadChildren: () =>
      import('./expense-edit.component/expense-edit.module').then((m) => {
        return m.EditModule;
      }),
  },
];

//git remote set-url https://github.com/YanCallier/AngularExo.git
// git remote set-url AngularExo https://github.com/YanCallier/AngularExo.git [https://github.com/LuccaTest/Test-Front.Yan-Callier.git]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
