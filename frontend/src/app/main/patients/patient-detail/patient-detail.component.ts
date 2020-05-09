import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, finalize, catchError } from 'rxjs/operators';

import { HttpService, IParams } from '../../../shared/http.service';
import { Patient } from '../../../models/patient.model';
import { Vaccination } from '../../../models/vaccination.model';

import { AddEditVaccinationModalComponent } from './add-edit-vaccination-modal/add-edit-vaccination-modal.component';
import { EditPatientModalComponent } from './edit-patient-modal/edit-patient-modal.component';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {

  patient$: Observable<Patient>;
  vaccinations$: Observable<Vaccination[]>;

  errorVaccinations: any = null;

  patient: Patient = null;
  patientLoading: boolean = false;

  @ViewChild(AddEditVaccinationModalComponent, {static: false}) vaccinationModal: AddEditVaccinationModalComponent;
  @ViewChild(EditPatientModalComponent, {static: false}) editPatientModal: EditPatientModalComponent;

  constructor(
    private route: ActivatedRoute,
    private http: HttpService
  ) { }

  ngOnInit() {
    this.getPatient();
    this.getVaccination();
  }

  getPatient(): void {
    this.patientLoading = true;

    this.patient$ = this.http.get<Patient>(`patient/${this.route.snapshot.params['id']}`).pipe(
      map(patient => {
        this.patientLoading = false;
        this.patient = patient.body;
        return patient.body;
      }),
      finalize(() => {
        this.patientLoading = false;
      })
    );
  }

  updatePatient(patient: Patient) {
    this.http.put<Patient>('patients', patient._id, patient).subscribe(() => {
      this.editPatientModal.close();
      this.editPatientModal.sendLoading = false;
      this.getPatient();
    });
  }

  getVaccination() {
    const vaccinationParams: IParams[] = [
      {key: 'patientId', value: this.route.snapshot.params['id']},
      {key: 'sort', value: 'createdDate,asc'}
    ];

    this.vaccinations$ = this.http.get<Vaccination[]>(`vaccinations`, vaccinationParams).pipe(
      map(res => {
        return res.body;
      }), 
      catchError(err => {
        this.errorVaccinations = err;
        return throwError(err);
      })
    );
  }

  createVaccination(vaccination: Vaccination) {
    this.http.post<Vaccination>('vaccinations', vaccination).subscribe(() => {
      this.vaccinationModal.close();
      this.vaccinationModal.sendLoading = false;
      this.getVaccination();
    });
  }

  updateVaccination(vaccination: Vaccination) {
    this.http.put<Vaccination>('vaccinations', vaccination._id, vaccination).subscribe(() => {
      this.vaccinationModal.close();
      this.vaccinationModal.sendLoading = false;
      this.getVaccination();
    });
  }

  handleQueryVaccination(vaccination: Vaccination): void {
    if(vaccination._id) {
      this.updateVaccination(vaccination);
    } else {
      this.createVaccination(vaccination);
    }
  }

  openVaccinationModal(vaccination?: Vaccination): void {
    this.vaccinationModal.open(vaccination);
  }

  openPatientModal(): void {
    this.editPatientModal.open(this.patient);
  }

  trackById(vaccination: Vaccination) {
    return vaccination._id;
  }

}
