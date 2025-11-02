import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInterface } from '../user-list/UserInterface';
import Swal, { SweetAlertIcon } from 'sweetalert2';


@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css'
})
export class UserAddComponent {
navigateTo(arg0: string) {
throw new Error('Method not implemented.');
}
addNewUser() {
throw new Error('Method not implemented.');
}
  formulario = new FormGroup({

    id: new FormControl(''),
    name: new FormControl(''),
    lastname: new FormControl('')
  });

  newUser: UserInterface = {
    id: 0,
    name: "",
    lastname: ""
  }
}