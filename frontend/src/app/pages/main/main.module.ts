import { NgModule } from '@angular/core';

import { MainRoutingModule } from './main-routing.module';
import { HeaderComponent } from '../../core/header/header.component';
import { AsideComponent } from '../../core/aside/aside.component';
import { FooterComponent } from '../../core/footer/footer.component';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main.component';
import { NgLazyProgressModule } from '../../core/lazy-progress/lazy-progress.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    MainComponent,
    AsideComponent
  ],
  imports: [
    MainRoutingModule,
    SharedModule,
    NgLazyProgressModule,
    DashboardModule
  ],
  exports: []
})
export class MainModule { }
