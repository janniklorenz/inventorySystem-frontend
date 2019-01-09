import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoselectDeviceComponent } from './autoselect-device.component';

describe('AutoselectDeviceComponent', () => {
  let component: AutoselectDeviceComponent;
  let fixture: ComponentFixture<AutoselectDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoselectDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoselectDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
