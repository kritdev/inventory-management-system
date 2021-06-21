import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './layout/main/main.component';

@NgModule({
  declarations: [
    HomeComponent,
    MainComponent
  ],
  imports: [
    SharedModule
  ]
})
export class PageModule {}
