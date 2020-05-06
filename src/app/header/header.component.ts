import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../user';
import { ForgotPasswordDialogComponent } from '../forgot-password-dialog/forgot-password-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar, 
  ) { }

  user: User;

  ngOnInit() {
    this.userService.userChange.subscribe(user=>this.user=user);
  }

  showLogin() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '350px', data:{}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (!result.forgot) {
        if (result.username && result.password) {
          this.login(result.username, result.password);
        }
      } else {
        const forgotRef = this.dialog.open(ForgotPasswordDialogComponent, {
          width: '350px', data:{username:result.username}
        });

        forgotRef.afterClosed().subscribe(result => {
          if (result.username && result.email) {
            this.userService.requestReset(result.username,result.email).subscribe(
              _ => {
                this.snackBar.open('Request Submitted!',null,{duration: 5000,});
              },
              error => {
                console.log(error);
                this.snackBar.open(`Sorry, we were unable to submit your request. Please try again, or contact an administrator!`,null,{
                  duration: 5000,
                });
              }
            ); 
          }
        });
      }
    });
  }

  showForgotPassword() {
    const dialogRef = this.dialog.open(ForgotPasswordDialogComponent, {
      width: '350px', data:{}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("ok");
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
      .subscribe(user => {
        this.snackBar.open(`Welcome, ${user.name}!`,null,{
          duration: 5000,
        });
      },
      error => {
        if (error.name === 'HttpErrorResponse' 
          && error.status === 401) {
            this.snackBar.open(`Sorry, we were unable to log you in. Please try again!`,null,{
              duration: 5000,
            });
        } else {
          console.log(error);
          this.snackBar.open(`We're sorry, login is currently experiencing issues. Please try again later!`,null,{
            duration: 5000,
          });
        }
      });
  }

  logout() {
    this.userService.logout()
      .subscribe(()=>{
        this.snackBar.open(`Logged out. See you again soon!`,null,{
          duration: 5000,
        });
      });
  }

  register(username:string,password:string,email:string) {
    this.userService.register(username,password,email)
      .subscribe(user => {
        this.snackBar.open(`Welcome, ${user.name}!`,null,{
          duration: 5000,
        });
      },
      error => {
        if (error.name === 'HttpErrorResponse' 
          && error.status === 400) {
            console.log('400 on user register:')
            console.log(error);
            if (error.error.code === 1) {
              this.snackBar.open(`Registration Failed! User already exists.`,null,{
                duration: 5000,
              });
            } else {
              this.snackBar.open(`We're sorry, registration is currently experiencing issues. Please try again later!`,null,{
                duration: 5000,
              });
            }
        } else {
          console.log(error);
          this.snackBar.open(`We're sorry, registration is currently experiencing issues. Please try again later!`,null,{
            duration: 5000,
          });
        }
      });
  }

}
