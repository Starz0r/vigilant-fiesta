import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGamesComponent } from './dashboard-games.component';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { GameService } from '../game.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DashboardGamesComponent', () => {
  let component: DashboardGamesComponent;
  let fixture: ComponentFixture<DashboardGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardGamesComponent ],
      imports: [MatTableModule,RouterTestingModule,HttpClientTestingModule],
      providers: [GameService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
