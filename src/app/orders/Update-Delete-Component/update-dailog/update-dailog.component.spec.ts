import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDailogComponent } from './update-dailog.component';

describe('UpdateDailogComponent', () => {
  let component: UpdateDailogComponent;
  let fixture: ComponentFixture<UpdateDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDailogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
