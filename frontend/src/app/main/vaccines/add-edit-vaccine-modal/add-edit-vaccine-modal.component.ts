import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Vaccine } from '../../../models/vaccine.model';

@Component({
  selector: 'add-edit-vaccine-modal',
  templateUrl: './add-edit-vaccine-modal.component.html',
  styleUrls: ['./add-edit-vaccine-modal.component.scss']
})
export class AddEditVaccineModalComponent {

  modal: NgbModalRef;
  sendLoading: boolean = false;

  formsData: Vaccine = {
    _id: null,
    name: null,
    description: null,
    date: null
  };

  @ViewChild('content', {static: false}) content: any;
  @Output() data = new EventEmitter<Vaccine>();

  constructor(
    private modalService: NgbModal
    ) { }

  open(vaccine?: Vaccine) {
    if(vaccine) {
      this.formsData = JSON.parse(JSON.stringify(vaccine));
    } else {
      this.formsData = {
        _id: null,
        name: null,
        description: null,
        date: null
      };
    }

    this.modal = this.modalService.open(this.content, { centered: true, backdrop: 'static' });
  }

  close() {
    this.modal.close('Close click');
  }

  sendData(){
    this.sendLoading = true;
    this.data.emit(this.formsData);
  }

}
