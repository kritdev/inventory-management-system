import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [
    SearchBarComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    SearchBarComponent
  ]
})
export class AppComponentModule {}
