import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { User } from '../../../models/user.model';

import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from '../../../shared/datepicker.service';

@Component({
  selector: 'add-edit-user-modal',
  templateUrl: './add-edit-user-modal.component.html',
  styleUrls: ['./add-edit-user-modal.component.scss'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class AddEditUserModalComponent {

  modal: NgbModalRef;
  sendLoading: boolean = false;

  date = new Date();

  userForm: FormGroup = new FormGroup({
    _id: new FormControl(null),
    email: new FormControl(null, [Validators.email, Validators.required]),
    username: new FormControl(null, [Validators.pattern('[a-zA-Z-]*'), Validators.required]),
    password: new FormControl(null, [Validators.pattern('[0-9a-zA-Z-_+=!?]*'), Validators.required]),
    firstName: new FormControl(null, [Validators.pattern('[a-zA-Z-]*'), Validators.required]),
    lastName: new FormControl(null, [Validators.pattern('[a-zA-Z-]*'), Validators.required]),
    birthDate: new FormControl(null, [Validators.pattern('[0-9-]*'), Validators.required]),
    registerDate: new FormControl(null)
  });

  @ViewChild('content', {static: false}) content: any;
  @Output() data = new EventEmitter<User>();

  constructor(
    private modalService: NgbModal
    ) { }

  open(user?: User) {
    this.userForm.reset();
    if(user) {
      this.userForm.patchValue({password: 'hidden', ...user});
    } else {
      this.userForm.patchValue({
        _id: null,
        email: null,
        username: null,
        password: null,
        firstName: null,
        lastName: null,
        birthDate: null,
        registerDate: null
      });
    }

    this.modal = this.modalService.open(this.content, { centered: true, backdrop: 'static' });
  }

  close() {
    this.modal.close('Close click');
  }

  sendData() {
    this.sendLoading = true;
    this.data.emit(this.userForm.value);
  }

}
