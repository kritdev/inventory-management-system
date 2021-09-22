import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormTemplateSettingComponent } from './form-template-setting/form-template-setting.component';
import { FormControlTextComponent } from './form-control-text/form-control-text.component';
import { SharedModule } from 'src/app/shared/shared.module';


const componentList = [
  FormTemplateSettingComponent,
  FormControlTextComponent
];

@NgModule({
  declarations: [ componentList ],
  imports: [
    SharedModule
  ],
  exports: [ componentList ]
})
export class AppFormModule { }
