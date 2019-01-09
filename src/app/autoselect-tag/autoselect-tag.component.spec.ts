import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoselectTagComponent } from './autoselect-tag.component';

describe('AutoselectTagComponent', () => {
  let component: AutoselectTagComponent;
  let fixture: ComponentFixture<AutoselectTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoselectTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoselectTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
