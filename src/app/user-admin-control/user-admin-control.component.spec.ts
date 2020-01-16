import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdminControlComponent } from './user-admin-control.component';

describe('UserAdminControlComponent', () => {
  let component: UserAdminControlComponent;
  let fixture: ComponentFixture<UserAdminControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAdminControlComponent ]
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
