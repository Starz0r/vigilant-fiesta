import { Component } from '@angular/core';
import { environment } from '../environments/environment';
 
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  production = environment.production;
  
  constructor(
    private userService: UserService
  ) { }
}
