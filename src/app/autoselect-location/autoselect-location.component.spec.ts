import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoselectLocationComponent } from './autoselect-location.component';

describe('AutoselectLocationComponent', () => {
  let component: AutoselectLocationComponent;
  let fixture: ComponentFixture<AutoselectLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoselectLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoselectLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
