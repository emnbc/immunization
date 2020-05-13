import { Component, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Vaccination } from '../../../../../models/vaccination.model';
import { Vaccine } from '../../../../../models/vaccine.model';
import { HttpService, Param } from '../../../../../shared/http.service';
import { Patient } from 'src/app/models/patient.model';

@Component({
  selector: 'vaccination-modal',
  templateUrl: './vaccination-modal.component.html',
  styleUrls: ['./vaccination-modal.component.scss']
})
export class AddEditVaccinationModalComponent {

  private validate: boolean | string[];

  modal: NgbModalRef;
  sendLoading: boolean = false;

  getVaccinesLoading: boolean = false;
  vaccines: Vaccine[] = [];
  vaccination: Vaccination;

  @ViewChild('content', {static: false}) content: any;
  @Input() patient: Patient;
  @Output() data = new EventEmitter<Vaccination>();

  constructor(
    private modalService: NgbModal,
    private http: HttpService
    ) { }

  open(vaccination?: Vaccination) {
    this.validate = true;
    if(vaccination) {
      this.vaccination = new Vaccination(JSON.parse(JSON.stringify(vaccination)));
    } else {
      this.vaccination = new Vaccination();
      this.vaccination.patientId = this.patient._id;
    }

    this.modal = this.modalService.open(this.content, { centered: true, backdrop: 'static' });
  }

  close() {
    this.modal.close('Close click');
  }

  getVaccines(value: string) {

    this.getVaccinesLoading = true;

    let paramsList: Param[] = [
      {key: 'size', value: '5'},
      {key: 'name', value: value}
    ];

    this.http.get<Vaccine[]>('vaccines', paramsList).subscribe(res => {
      this.vaccines = Vaccine.initArray(res.body);
      this.getVaccinesLoading = false;
    });
  }

  handleVaccine(val: Vaccine) {
    return val.name;
  }

  setVaccine(val: Vaccine) {
    this.vaccination.vaccineId = val._id;
    this.change();
  }

  sendData(){
    this.validate = this.vaccination.validate();
    this.sendLoading = true;
    if(this.validate === true) {
      this.vaccination.agree = +this.vaccination.agree;
      this.data.emit(this.vaccination);
    } else {
      this.sendLoading = false;
    }
  }

  change() {
    if(typeof this.validate !== 'boolean') {
      this.validate = this.vaccination.validate();
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
