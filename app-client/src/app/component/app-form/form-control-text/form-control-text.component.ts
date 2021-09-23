import { Component, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { ISetting } from 'src/app/entity/setting.model';

@Component({
  selector: 'app-form-control-text',
  templateUrl: './form-control-text.component.html',
  styleUrls: ['./form-control-text.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class FormControlTextComponent {
  @Input() setting: ISetting;
  @Input() fieldName: string | undefined;
  @Input() isRequired: boolean | false;
}
