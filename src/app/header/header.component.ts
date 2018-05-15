import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {

  }

  showIt: boolean = false;

  showModal() {
    this.showIt = true;
  }
  
  closeModal(creds: any) {
    this.showIt = false;
    if (creds) {
      this.login(creds.username, creds.password);
    }
  }

  login(username: string, password: string) {
    this.userService.login(username,password)
      .subscribe(user => console.log('logged in'),
      error => {
        if (error.name === 'HttpErrorResponse' 
          && error.status === 401) {
          //TODO: notify user that login failed
        } else {
          console.log(error);
        }
      });
  }

  logout() {
    this.userService.logout()
      .subscribe(()=>console.log('logged out'));
  }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  register() {
    console.log("user wants to register")
  }

}
