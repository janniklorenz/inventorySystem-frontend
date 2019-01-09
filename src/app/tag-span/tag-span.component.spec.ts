import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagSpanComponent } from './tag-span.component';

describe('TagSpanComponent', () => {
  let component: TagSpanComponent;
  let fixture: ComponentFixture<TagSpanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagSpanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagSpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
