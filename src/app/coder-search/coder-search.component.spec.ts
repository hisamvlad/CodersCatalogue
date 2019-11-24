import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoderSearchComponent } from './coder-search.component';

describe('CoderSearchComponent', () => {
  let component: CoderSearchComponent;
  let fixture: ComponentFixture<CoderSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoderSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
