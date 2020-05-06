import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  private username: string;
  private token: string;
  private hide = true;

  group: FormGroup = new FormGroup({
    password: new FormControl(''),
    password2: new FormControl('')},
    this.checkIfMatchingPasswords);
    
  get password() { return this.group.get('password'); }
  get password2() { return this.group.get('password2'); }

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserService,
      private snackBar: MatSnackBar) {
    console.log('Called Constructor');
    this.route.queryParams.subscribe(params => {
        this.username = params['name'];
        this.token = params['token'];
        if (!this.username || !this.token) {
          this.router.navigateByUrl('/');
        }
    });
  }

  ngOnInit() {
  }

  checkIfMatchingPasswords(group: FormGroup) {
    let passwordInput = group.controls['password'],
        passwordConfirmationInput = group.controls['password2'];

    if (passwordInput.value !== passwordConfirmationInput.value) {
      return {notEquivalent: true};
    } else {
      return null;
    }
  }

  ok() {
    this.userService.resetPassword(
      this.username,
      this.token,
      this.group.get('password').value)
    .subscribe(user => {
      this.snackBar.open(`Welcome back, ${user.name}!`,null,{
        duration: 5000,
      });
      this.router.navigateByUrl('/');
    },
    error => {
      if (error.name === 'HttpErrorResponse' 
        && error.status === 401) {
          this.snackBar.open(`Sorry, it looks like that token was invalid. Please try again, or contact an administrator!`,null,{
            duration: 5000,
          });
      } else {
        console.log(error);
        this.snackBar.open(`Sorry, we were unable to reset your password. Please try again, or contact an administrator!`,null,{
          duration: 5000,
        });
      }
    });
  }
}
