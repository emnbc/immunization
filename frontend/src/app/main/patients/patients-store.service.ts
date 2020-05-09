import { Injectable } from '@angular/core';
import { Patient } from '../../models/patient.model';

@Injectable()
export class PatientsStoreService {

  /**
   * State of page
   */
  page: number = 1;

  /**
   * State of total count
   */
  totalCount: number = null;

  /**
   * State of sorting
   */
  sortingState: string = null;

  /**
   * State of search forms
   */
  searchForms: Patient = {
    firstName: null,
    lastName: null,
    birthDate: null,
    sex: null,
    phone: null
  }

}
