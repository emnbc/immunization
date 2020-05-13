import { NgModule } from '@angular/core';

import { VaccinesComponent } from './vaccines.component';
import { VaccineModalComponent } from './vaccine-modal/vaccine-modal.component';
import { VaccinesRoutingModule } from './vaccines-routing.module';

import { SharedModule } from '../../../shared/shared.module';
import { SortingModule } from '../../../core/sorting/sorting.module';

@NgModule({
  declarations: [
    VaccinesComponent,
    VaccineModalComponent
  ],
  imports: [
    SharedModule,
    VaccinesRoutingModule,
    SortingModule
  ],
  exports: [
    VaccineModalComponent
  ]
})
export class VaccinesModule { }
