import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesComponent } from './games.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DashboardGamesComponent } from '../dashboard-games/dashboard-games.component';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { GameService } from '../game.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { RatingPipe } from '../rating.pipe';
import { DifficultyPipe } from '../difficulty.pipe';
import { DecimalPipe } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagInputComponent } from '../tag-input/tag-input.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

describe('GamesComponent', () => {
  let component: GamesComponent;
  let fixture: ComponentFixture<GamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        GamesComponent, DashboardGamesComponent,
        RatingPipe,
        DifficultyPipe,
        TagInputComponent
      ],
      imports: [ FormsModule,
        MatInputModule,
        MatTableModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatExpansionModule,
        MatSliderModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatRadioModule,
        BrowserAnimationsModule,
        MatChipsModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule
      ],
      providers: [
        GameService,
        DecimalPipe
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
