import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService, IParams } from '../../shared/http.service';
import { Patient } from '../../models/patient.model';
import { Vaccination } from '../../models/vaccination.model';
import { AddPatientModalComponent } from './add-patient-modal/add-patient-modal.component';
import { PatientsStoreService } from './patients-store.service';

import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from '../../shared/datepicker.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class PatientsComponent implements OnInit {

  date = new Date();
  size: number = 10;
  patients: Patient[] = [];
  loading: boolean = false;
  changing: boolean = false;

  @ViewChild(AddPatientModalComponent, {static: false}) modal: AddPatientModalComponent;

  constructor(
    private http: HttpService,
    private router: Router,
    public store: PatientsStoreService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.getPatients(this.store.page, this.size);
  }

  getPatients(page: number, size: number): void {
    this.store.page = page;

    let paramsList: IParams[] = [
      {key: 'size', value: size},
      {key: 'page', value: this.store.page},
      {key: 'sort', value: this.store.sortingState},
      {key: 'firstName', value: this.store.searchForms.firstName},
      {key: 'lastName', value: this.store.searchForms.lastName},
      {key: 'birthDate', value: this.store.searchForms.birthDate},
      {key: 'sex', value: this.store.searchForms.sex || null },
      {key: 'phone', value: this.store.searchForms.phone}
    ];

    this.http.get<Patient[]>('patients', paramsList).subscribe(res => {
      this.patients = res.body;
      this.store.totalCount = +res.headers.get('X-Total-Count');
      this.changing = this.loading = false;
    });
  }

  openModal(): void {
    this.modal.open();
  }

  pageChange(page: number): void {
    this.changing = true;
    this.getPatients(page, this.size);
  }

  changeSorting(result: string) {
    this.changing = true;
    this.store.sortingState = result;
    this.getPatients(this.store.page, this.size);
  }

  private listener: ReturnType<typeof setTimeout>;
  changeFilter(keyCode: number) {
    if(keyCode !== 9) {
      this.changing = true;
      clearTimeout(this.listener);
      this.listener = setTimeout(() => {
        this.getPatients(this.store.page, this.size);
      }, 300);
    }
  }

  trackById(patient: Patient) {    
    return patient._id;
  }

  openPatient(id: string): void {
    this.router.navigate([`patients/${id}`]);
  }

  createPatient(patient: Patient): void {
    this.changing = true;
    this.http.post<Patient>('patients', patient).subscribe(() => {
      this.modal.close();
      this.modal.sendLoading = false;
      this.getPatients(this.store.page, this.size);
    });
  }

  checkStatus(vaccination: Vaccination[]): boolean {
    let status: number[] = [];
    vaccination.forEach(vac => status.push(vac.status));
    if(status.includes(1)) return true;
    else return false;
  }

  resetForms() {
    this.changing = true;
    this.store.searchForms = {
      firstName: null,
      lastName: null,
      birthDate: null,
      sex: null,
      phone: null
    }
    this.getPatients(this.store.page, this.size);
  }

}
