import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoderDetailComponent } from './coder-detail.component';

describe('CoderDetailComponent', () => {
  let component: CoderDetailComponent;
  let fixture: ComponentFixture<CoderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
