import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameScreenshotsComponent } from './game-screenshots.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('GameScreenshotsComponent', () => {
  let component: GameScreenshotsComponent;
  let fixture: ComponentFixture<GameScreenshotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameScreenshotsComponent ],
      imports: [ NgxGalleryModule,
      BrowserModule,
      BrowserAnimationsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameScreenshotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
