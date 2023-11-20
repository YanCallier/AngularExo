import { NgModule } from '@angular/core';

import { EditComponent } from './expense-edit';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([{ path: '', component: EditComponent }]),
  ],
  declarations: [EditComponent],
  bootstrap: [EditComponent],
})
export class EditModule {}
