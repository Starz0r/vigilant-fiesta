import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  production = environment.production;

  user: User;

  constructor(
    private userService: UserService,
    ) {
      this.userService.userChange.subscribe(user=>this.user=user);
    }

  ngOnInit() {
  }

  showAdmin() {
    return this.user != null && this.user.isAdmin;
  }

}
