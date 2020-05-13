import { NgModule } from '@angular/core';
import { TextMaskModule } from 'angular2-text-mask';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './patients.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { PatientModalComponent } from './patient-modal/patient-modal.component';
import { AddEditVaccinationModalComponent } from './patient-detail/vaccination-modal/vaccination-modal.component';
import { AutocompleteModule } from '../../../core/autocomplete/autocomplete.module';
import { PatientsStoreService } from './patients-store.service';

import { SharedModule } from '../../../shared/shared.module';
import { SortingModule } from '../../../core/sorting/sorting.module';
import { SkeletonLoadingModule } from '../../../core/skeleton-loading/skeleton-loading.module';

@NgModule({
  declarations: [
    PatientsComponent,
    PatientDetailComponent,
    PatientModalComponent,
    AddEditVaccinationModalComponent
  ],
  imports: [
    PatientsRoutingModule,
    SharedModule,
    AutocompleteModule,
    SortingModule,
    SkeletonLoadingModule,
    TextMaskModule
  ],
  exports: [
    PatientModalComponent
  ],
  providers: [
    PatientsStoreService
  ]
})
export class PatientsModule { }