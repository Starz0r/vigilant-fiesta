import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DashboardGamesComponent } from '../dashboard-games/dashboard-games.component';
import { ReviewListComponent } from '../review-list/review-list.component';
import { UserAdminControlComponent } from '../user-admin-control/user-admin-control.component';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReviewComponent } from '../review/review.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GameService } from '../game.service';
import { UserService } from '../user.service';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent,
        DashboardGamesComponent,
        ReviewListComponent,
        UserAdminControlComponent,
        ReviewComponent
      ],
      imports: [
        MatTabsModule,
        MatTableModule,
        RouterTestingModule,
        MatSnackBarModule,
        MatCheckboxModule,
        FormsModule,
        MatCardModule,
        HttpClientTestingModule,
        MatSnackBarModule
      ],
      providers: [
        GameService, UserService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
