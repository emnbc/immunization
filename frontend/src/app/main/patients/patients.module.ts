import { NgModule } from '@angular/core';
import { TextMaskModule } from 'angular2-text-mask';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './patients.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { AddPatientModalComponent } from './add-patient-modal/add-patient-modal.component';
import { EditPatientModalComponent } from './patient-detail/edit-patient-modal/edit-patient-modal.component';
import { AddEditVaccinationModalComponent } from './patient-detail/add-edit-vaccination-modal/add-edit-vaccination-modal.component';
import { AutocompleteModule } from '../../core/autocomplete/autocomplete.module';
import { PatientsStoreService } from './patients-store.service';

import { SharedModule } from '../../shared/shared.module';
import { SortingModule } from '../../core/sorting/sorting.module';
import { SkeletonLoadingModule } from '../../core/skeleton-loading/skeleton-loading.module';

@NgModule({
  declarations: [
    PatientsComponent,
    PatientDetailComponent,
    AddPatientModalComponent,
    EditPatientModalComponent,
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
    AddPatientModalComponent
  ],
  providers: [
    PatientsStoreService
  ]
})
export class PatientsModule { }