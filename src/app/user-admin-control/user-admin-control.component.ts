import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user-admin-control',
  templateUrl: './user-admin-control.component.html',
  styleUrls: ['./user-admin-control.component.scss']
})
export class UserAdminControlComponent implements OnInit {

  @Input() user: User;

  today = new Date();

  constructor() { }

  ngOnInit() {
    console.log(this.user);
  }

  get permissions(): any[] {
    return this.user? Object.values(this.user.permissions) : [];
  }

  update() {
    
  }

}
