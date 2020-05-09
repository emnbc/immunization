import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Patient } from '../../../models/patient.model';

import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from '../../../shared/datepicker.service';

@Component({
  selector: 'add-patient-modal',
  templateUrl: './add-patient-modal.component.html',
  styleUrls: ['./add-patient-modal.component.scss'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class AddPatientModalComponent {

  modal: NgbModalRef;
  sendLoading: boolean = false;
  date = new Date();
  phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

  formsData: Patient = {
    firstName: null,
    lastName: null,
    birthDate: null,
    sex: null,
    phone: null
  };

  @ViewChild('content', {static: false}) content: any;
  @Output() data = new EventEmitter<Patient>();

  constructor(
    private modalService: NgbModal
    ) { }

  open() {
    this.formsData = {
      firstName: null,
      lastName: null,
      birthDate: null,
      sex: null,
      phone: null
    };

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
    this.sendLoading = true;
    this.formsData.phone = this.toOnlyNumbers(this.formsData.phone);
    this.data.emit(this.formsData);
  }

}
