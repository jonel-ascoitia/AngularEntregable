import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserModule } from './user/user.module';
import { UserComponent } from "./user/user.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'senati-web-Munos-fe';
}
