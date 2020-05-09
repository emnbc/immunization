import { NgModule } from '@angular/core';

import { VaccinesComponent } from './vaccines.component';
import { AddEditVaccineModalComponent } from './add-edit-vaccine-modal/add-edit-vaccine-modal.component';
import { VaccinesRoutingModule } from './vaccines-routing.madule';

import { SharedModule } from '../../shared/shared.module';
import { SortingModule } from '../../core/sorting/sorting.module';

@NgModule({
  declarations: [
    VaccinesComponent,
    AddEditVaccineModalComponent
  ],
  imports: [
    SharedModule,
    VaccinesRoutingModule,
    SortingModule
  ],
  exports: [
    AddEditVaccineModalComponent
  ]
})
export class VaccinesModule { }
