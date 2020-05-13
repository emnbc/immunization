import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Vaccine } from '../../../../models/vaccine.model';

@Component({
  selector: 'vaccine-modal',
  templateUrl: './vaccine-modal.component.html',
  styleUrls: ['./vaccine-modal.component.scss']
})
export class VaccineModalComponent {

  private validate: boolean | string[];
  modal: NgbModalRef;
  sendLoading: boolean = false;
  vaccine: Vaccine;

  @ViewChild('content', {static: false}) content: any;
  @Output() data = new EventEmitter<Vaccine>();

  constructor(
    private modalService: NgbModal
    ) { }

  open(vaccine?: Vaccine) {
    if(vaccine) {
      this.vaccine = new Vaccine(JSON.parse(JSON.stringify(vaccine)));
    } else {
      this.vaccine = new Vaccine();
    }
    this.modal = this.modalService.open(this.content, { centered: true, backdrop: 'static' });
  }

  close() {
    this.modal.close('Close click');
  }

  sendData(){
    this.validate = this.vaccine.validate();
    this.sendLoading = true;
    if(this.validate === true) {
      this.data.emit(this.vaccine);
    } else {
      this.sendLoading = false;
    }
  }

  change() {
    if(typeof this.validate !== 'boolean') {
      this.validate = this.vaccine.validate();
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
