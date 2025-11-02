import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { UserInterface } from './UserInterface';
import { Router } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  private http = inject(HttpClient);
  private router = inject(Router);

  private usersSubject = new BehaviorSubject<UserInterface[]>([]);
  users: Observable<UserInterface[]> = this.usersSubject.asObservable();

  newUser: UserInterface = {
    id: 0,
    name: "",
    lastname: ""
  };

   navigateTo(path: String){
    this.router.navigate([path]);
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
        //Codigo cuando termina la alerta.
        console.log("termino");
      }
    });
    Toast.fire({
      icon: `${status}`,
      title: `${message}`
    });
  }


  getAllUsers() {
    this.http.get<UserInterface[]>("https://entregablewed-bfegaygqf3b8ewar.chilecentral-01.azurewebsites.net/api/users").subscribe(users => {
      this.usersSubject.next(users);
    });
  }

  deleteUser(userId: number) {
  Swal.fire({
    title: "¿Estás seguro de eliminar?",
    text: `Si estás seguro eliminar el registro ${userId}, Acepta`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar"
  }).then((result) => {
    if (result.isConfirmed) {
      this.deleteUserById(userId);
    }
  });
  }

  addUser() {
    this.http.post("https://entregablewed-bfegaygqf3b8ewar.chilecentral-01.azurewebsites.net/api/users", this.newUser).subscribe(resultado => {
        console.log(resultado)
      });
    }

  deleteUserById(id: number){
  this.http.delete(`https://entregablewed-bfegaygqf3b8ewar.chilecentral-01.azurewebsites.net/api/users/${id}`).subscribe({
    next: () => {
      const current = this.usersSubject.getValue();
      this.usersSubject.next(current.filter(u => u.id !== id));
      Swal.fire({
        title: "Eliminado",
        text: "El registro fue eliminado",
        icon: "success"
      });
    },
    error: err => {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "No se pudo eliminar el registro",
        icon: "error"
      });
    }
  });
  }

  ngOnInit() {
    this.getAllUsers();
  }

  }

