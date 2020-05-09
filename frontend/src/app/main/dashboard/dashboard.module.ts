import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { BarComponent } from './bar/bar.component';
import { DonutComponent } from './donut/donut.component';



@NgModule({
  declarations: [DashboardComponent, BarComponent, DonutComponent],
  imports: [SharedModule, NgxChartsModule]
})
export class DashboardModule { }
