import { NgModule } from '@angular/core';
import { PageRoutingModule } from './page-routing.module';
import { AppComponentModule } from '../component/app-component.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './layout/main/main.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

@NgModule({
  declarations: [
    HomeComponent,
    MainComponent,
    NavbarComponent
  ],
  imports: [
    SharedModule,
    PageRoutingModule,
    AppComponentModule,
  ],
  exports: [
    MainComponent,
    NavbarComponent
  ]
})
export class PageModule {}
