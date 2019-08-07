import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewideaComponent } from './newidea.component';

describe('NewideaComponent', () => {
  let component: NewideaComponent;
  let fixture: ComponentFixture<NewideaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewideaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewideaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
