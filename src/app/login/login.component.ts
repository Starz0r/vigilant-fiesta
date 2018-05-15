import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() oldname = "";
  @Output() close = new EventEmitter<any>();
  username = "";
  password = "";

  constructor() { }

  ngOnInit() {
  }

  ok() {
    this.close.emit({
      username: this.username,
      password: this.password
    });
  }

  cancel() {
    this.close.emit(null);
  }

}
