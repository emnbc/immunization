import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Patient } from '../../../../models/patient.model';

import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from '../../../../shared/datepicker.service';

@Component({
  selector: 'patient-modal',
  templateUrl: './patient-modal.component.html',
  styleUrls: ['./patient-modal.component.scss'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class PatientModalComponent {

  private validate: boolean | string[];
  modal: NgbModalRef;
  sendLoading: boolean = false;
  date = new Date();
  phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  patient: Patient;

  @ViewChild('content', {static: false}) content: any;
  @Output() data = new EventEmitter<Patient>();

  constructor(
    private modalService: NgbModal
    ) { }

  open(patient?: Patient) {
    this.validate = true;
    if(patient) {
      this.patient = new Patient(JSON.parse(JSON.stringify(patient)));
    } else {
      this.patient = new Patient();
    }
    this.modal = this.modalService.open(this.content, { centered: true, backdrop: 'static' });
  }

  close() {
    this.modal.close('Close click');
  }

  toOnlyNumbers(val: string) {
    if(val) return val.replace(/[-() ]+/g, '');
    else return val;
  }

  sendData(){
    this.validate = this.patient.validate();
    this.sendLoading = true;
    if(this.validate === true) {
      this.patient.phone = this.toOnlyNumbers(this.patient.phone);
      this.data.emit(this.patient);
    } else {
      this.sendLoading = false;
    }
  }

  change() {
    if(typeof this.validate !== 'boolean') {
      this.validate = this.patient.validate();
      if(this.validate === true) {
      }
    }
  }

  isRequired(field: string): string {
    if(typeof this.validate !== 'boolean' && Array.isArray(this.validate)) {
      return this.validate.includes(field) ? 'is-invalid' : '';
    } else return;
  }

}
