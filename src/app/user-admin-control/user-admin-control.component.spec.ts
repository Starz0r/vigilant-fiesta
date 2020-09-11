import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdminControlComponent } from './user-admin-control.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GameService } from '../game.service';
import { MatInputModule } from '@angular/material/input';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('UserAdminControlComponent', () => {
  let component: UserAdminControlComponent;
  let fixture: ComponentFixture<UserAdminControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAdminControlComponent ],
      imports: [
        FormsModule,
        MatInputModule,
        MatDatepickerModule,
        MatFormFieldModule,
        HttpClientTestingModule,
        MatSnackBarModule
      ],
      providers: [
        GameService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAdminControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
