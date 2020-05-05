import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenshotMgmtComponent } from './screenshot-mgmt.component';

describe('ScreenshotMgmtComponent', () => {
  let component: ScreenshotMgmtComponent;
  let fixture: ComponentFixture<ScreenshotMgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenshotMgmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenshotMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
