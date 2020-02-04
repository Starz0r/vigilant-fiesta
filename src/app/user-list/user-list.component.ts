import { Component, OnInit, SimpleChanges, OnDestroy, OnChanges } from '@angular/core';
import { User } from '../user';
import { Subject } from 'rxjs';
import { UserService } from '../user.service';
import { debounceTime } from 'rxjs/operators';
import { GameService } from '../game.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnChanges, OnDestroy {

  users: User[] = [];
  loading: boolean = true;

  columnsToDisplay=['user','joined'];

  debounceSearch: Subject<SimpleChanges> = new Subject<SimpleChanges>();
  
  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.getUsers();

    this.debounceSearch
      .pipe(debounceTime(300))
      .subscribe(() => {
        this.getUsers();
      });
  }

  ngOnDestroy() {
    this.debounceSearch.unsubscribe();
  }
  
  ngOnChanges(changes: SimpleChanges) {
    this.debounceSearch.next(changes)
  }

  getUsers(): void {
    this.gameService.getUsers().subscribe(users => {
        this.users = users;
        this.loading = false;
      });
  }

}
