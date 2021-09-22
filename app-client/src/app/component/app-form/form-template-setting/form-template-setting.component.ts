import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISetting } from 'src/app/entity/setting.model';

@Component({
  selector: 'app-form-template-setting',
  templateUrl: './form-template-setting.component.html',
  styleUrls: ['./form-template-setting.component.css']
})
export class FormTemplateSettingComponent {
  @Input() vm: ISetting;
  @Output() save = new EventEmitter();
  
  previousState(): void {
    window.history.back();
  }

  onSubmit() {
    this.save.emit(this.vm);
  }
}
