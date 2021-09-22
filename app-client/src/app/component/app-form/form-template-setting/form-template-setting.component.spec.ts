import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTemplateSettingComponent } from './form-template-setting.component';

describe('FormTemplateSettingComponent', () => {
  let component: FormTemplateSettingComponent;
  let fixture: ComponentFixture<FormTemplateSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTemplateSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTemplateSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
