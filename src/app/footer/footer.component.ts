import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserService } from '../user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  production = environment.production;

  constructor(
    private userService: UserService,
    ) { }

  ngOnInit() {
  }

  showAdmin() {
    if (!this.userService.isLoggedIn()) return false;
    
    const user = this.userService.getUser();
    return user != null && user.isAdmin;
  }

}
