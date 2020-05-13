import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService, Param } from '../../../shared/http.service';
import { Vaccine } from '../../../models/vaccine.model';
import { VaccineModalComponent } from './vaccine-modal/vaccine-modal.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'imm-vaccines',
  templateUrl: './vaccines.component.html',
  styleUrls: ['./vaccines.component.scss']
})
export class VaccinesComponent implements OnInit {

  page: number = 1;
  size: number = 10;
  totalCount: number = null;
  loading: boolean = false;
  changing: boolean = false;
  sortingState: string = null;

  vaccines: Vaccine[] = [];

  responseVaccines: Observable<HttpResponse<Vaccine[]>> = null;

  @ViewChild(VaccineModalComponent, {static: false}) modal: VaccineModalComponent;

  constructor(
    private http: HttpService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.getVaccines(this.page, this.size);
  }

  getVaccines(page: number, size: number): void {

    this.page = page;

    let paramsList: Param[] = [
      {key: 'size', value: size.toString()},
      {key: 'page', value: this.page.toString()},
      {key: 'sort', value: this.sortingState}
    ];

    this.http.get<Vaccine[]>('vaccines', paramsList).subscribe(res => {
      this.vaccines = Vaccine.initArray(res.body);
      this.totalCount = +res.headers.get('X-Total-Count');
      this.changing = this.loading = false;
    });

  }

  createVccine(vaccine: Vaccine): void {
    this.http.post<Vaccine>('vaccines', vaccine).subscribe(() => {
      this.modal.close();
      this.modal.sendLoading = false;
      this.changing = true;
      this.getVaccines(this.page, this.size);
    });
  }

  updateVccine(vaccine: Vaccine) {
    this.http.put<Vaccine>('vaccines', vaccine._id, vaccine).subscribe(() => {
      this.modal.close();
      this.modal.sendLoading = false;
      this.changing = true;
      this.getVaccines(this.page, this.size);
    });
  }

  trackById(vaccine: Vaccine) {
    return vaccine._id;
  }

  pageChange(page: number): void {
    this.changing = true;
    this.getVaccines(page, this.size);
  }

  handleQueryVaccine(vaccine: Vaccine) {
    if(vaccine._id) {
      // Update
      this.updateVccine(vaccine);
    } else {
      // Create
      this.createVccine(vaccine);
    }
  }

  changeSorting(result: string) {
    this.changing = true;
    this.sortingState = result;
    this.getVaccines(this.page, this.size);
  }

  

  openModal(vaccine?: Vaccine): void {
    this.modal.open(vaccine);
  }

}
