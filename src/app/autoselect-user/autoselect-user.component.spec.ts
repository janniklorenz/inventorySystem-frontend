import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoselectUserComponent } from './autoselect-user.component';

describe('AutoselectUserComponent', () => {
  let component: AutoselectUserComponent;
  let fixture: ComponentFixture<AutoselectUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoselectUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoselectUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
