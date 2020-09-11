import { Component, OnInit, SimpleChanges, OnDestroy, OnChanges } from '@angular/core';
import { User } from '../model/user';
import { Subject, Observable, of } from 'rxjs';
import { UserService } from '../service/user.service';
import { debounceTime, startWith, map, tap, switchMap } from 'rxjs/operators';
import { GameService } from '../service/game.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnChanges, OnDestroy {

  myControl = new FormControl();
  
  users: User[] = [];
  loading: boolean = true;

  columnsToDisplay=['user','joined'];

  debounceSearch: Subject<SimpleChanges> = new Subject<SimpleChanges>();
  
  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.myControl.valueChanges
    .pipe(
      debounceTime(500),
      switchMap(value => this.gameService.getUsers(value))
    )
    .subscribe(data => {
      this.users = data;
    });
    
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
