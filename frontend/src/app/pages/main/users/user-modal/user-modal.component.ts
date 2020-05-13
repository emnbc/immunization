import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { User } from '../../../../models/user.model';
import { CustomAdapter, CustomDateParserFormatter } from '../../../../shared/datepicker.service';

@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class UserModalComponent {

  private validate: boolean | string[];
  modal: NgbModalRef;
  sendLoading: boolean = false;
  user: User;
  date = new Date();

  @ViewChild('content', {static: false}) content: any;
  @Output() data = new EventEmitter<User>();

  constructor(
    private modalService: NgbModal
    ) { }

  open(user?: User) {
    this.validate = true;
    if(user) {
      this.user = new User(JSON.parse(JSON.stringify(user)));
      this.user.password = 'hidden';
    } else {
      this.user = new User();
    }
    this.modal = this.modalService.open(this.content, { centered: true, backdrop: 'static' });
  }

  close() {
    this.modal.close('Close click');
  }

  sendData() {
    this.validate = this.user.validate();
    this.sendLoading = true;
    if(this.validate === true) {
      this.data.emit(this.user);
    } else {
      this.sendLoading = false;
    }
  }

  change() {
    if(typeof this.validate !== 'boolean') {
      this.validate = this.user.validate();
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
