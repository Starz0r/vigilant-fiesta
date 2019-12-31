import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

  }

  showLogin() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '350px', data:{}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.login(result.username, result.password);
    });
  }

  showRegister() {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '350px', data:{}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.register(result.username, result.password, result.email);
    });
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

  register(username:string,password:string,email:string) {
    this.userService.register(username,password,email)
    .subscribe(user => console.log('logged in'),
    error => {
      if (error.name === 'HttpErrorResponse' 
        && error.status === 400) {
        //TODO: notify user that login failed
      } else {
        console.log(error);
      }
    });
  }

}
