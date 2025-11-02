import { HttpClient } from '@angular/common/http';
import { Component, inject, Input, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInterface } from '../user-list/UserInterface';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent {

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
  private http = inject(HttpClient);
  private router = inject(Router)
  private route = inject(ActivatedRoute);

  userId: Number = 0;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.formulario.controls.id.setValue(params["id"]);
      this.userId = params["id"]
      console.log(params["id"])
    })
  }

  updateUser() {
  let id = Number(this.formulario.controls.id.value);
  this.newUser.id = id;
  this.newUser.name = String(this.formulario.controls.name.value);
  this.newUser.lastname = String(this.formulario.controls.lastname.value);

  this.http.put(`https://entregablewed-bfegaygqf3b8ewar.chilecentral-01.azurewebsites.net/api/users/${id}`, this.newUser).subscribe(resultado => {
      this.showAlert("success", "Se actualizó correctamente");
    });
  }

  showAlert(status: SweetAlertIcon, message: string){
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
        didClose: () => {
          console.log("termino");
          this.router.navigate(["/"]);
        }
      });
      Toast.fire({
        icon: `${status}`,
        title: `${message}`
      });
    }
    
    navigateTo(path: String){
    this.router.navigate([path]);
  }
}
