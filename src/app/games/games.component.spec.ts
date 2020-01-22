import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesComponent } from './games.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DashboardGamesComponent } from '../dashboard-games/dashboard-games.component';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { GameService } from '../game.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GamesComponent', () => {
  let component: GamesComponent;
  let fixture: ComponentFixture<GamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesComponent, DashboardGamesComponent ],
      imports: [ FormsModule,
        MatInputModule,
        MatTableModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        GameService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
