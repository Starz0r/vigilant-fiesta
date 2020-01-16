import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user-admin-control',
  templateUrl: './user-admin-control.component.html',
  styleUrls: ['./user-admin-control.component.scss']
})
export class UserAdminControlComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
