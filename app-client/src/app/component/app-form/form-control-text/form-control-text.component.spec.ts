import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlTextComponent } from './form-control-text.component';

describe('FormControlTextComponent', () => {
  let component: FormControlTextComponent;
  let fixture: ComponentFixture<FormControlTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormControlTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
