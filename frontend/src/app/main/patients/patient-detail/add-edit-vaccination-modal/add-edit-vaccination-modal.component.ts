import { Component, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Vaccination } from '../../../../models/vaccination.model';
import { Vaccine } from '../../../../models/vaccine.model';
import { HttpService, IParams } from '../../../../shared/http.service';
import { Patient } from 'src/app/models/patient.model';

@Component({
  selector: 'add-edit-vaccination-modal',
  templateUrl: './add-edit-vaccination-modal.component.html',
  styleUrls: ['./add-edit-vaccination-modal.component.scss']
})
export class AddEditVaccinationModalComponent {

  modal: NgbModalRef;
  sendLoading: boolean = false;

  getVaccinesLoading: boolean = false;
  vaccines: Vaccine[] = [];

  formsData: Vaccination = {
    _id: null,
    patientId: null,
    vaccineId: null,
    agree: null,
    status: null,
    createdDate: null,
    vaccineName: null
  };

  @ViewChild('content', {static: false}) content: any;
  @Input() patient: Patient;
  @Output() data = new EventEmitter<Vaccination>();

  constructor(
    private modalService: NgbModal,
    private http: HttpService
    ) { }

  open(vaccination?: Vaccination) {
    if(vaccination) {
      this.formsData = JSON.parse(JSON.stringify(vaccination));
    } else {
      this.formsData = {
        _id: null,
        patientId: this.patient._id,
        vaccineId: null,
        agree: 0,
        status: null,
        createdDate: null,
        vaccineName: null
      };
    }

    this.modal = this.modalService.open(this.content, { centered: true, backdrop: 'static' });
  }

  close() {
    this.modal.close('Close click');
  }

  getVaccines(value: string) {

    this.getVaccinesLoading = true;

    let paramsList: IParams[] = [
      {key: 'size', value: '5'},
      {key: 'name', value: value}
    ];

    this.http.get<Vaccine[]>('vaccines', paramsList).subscribe(res => {
      this.vaccines = res.body;
      this.getVaccinesLoading = false;
    });
  }

  handleVaccine(val: Vaccine) {
    return val.name;
  }

  setVaccine(val: Vaccine) {
    this.formsData.vaccineId = val._id;
  }

  sendData(){
    this.sendLoading = true;
    this.data.emit(this.formsData);
  }

}
