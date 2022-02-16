import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMakeTableComponent } from './form-make-table.component';

describe('FormMakeTableComponent', () => {
  let component: FormMakeTableComponent;
  let fixture: ComponentFixture<FormMakeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMakeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMakeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
