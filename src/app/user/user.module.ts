import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserComponent
  ],
  exports: [
    UserComponent
  ]
})
export class UserModule { }
