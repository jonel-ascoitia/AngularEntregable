import { Component } from '@angular/core';
import { UserListComponent } from "./user-list/user-list.component";
import { UserUpdateComponent } from "./user-update/user-update.component";
import { UserAddComponent } from "./user-add/user-add.component";
import { UserDeleteComponent } from "./user-delete/user-delete.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [UserListComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
