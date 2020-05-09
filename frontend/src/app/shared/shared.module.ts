import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BirthDatePipe } from './pipes/dots-date.pipe';


@NgModule({
    declarations: [BirthDatePipe],
    exports: [
        HttpClientModule,
        CommonModule,
        FormsModule,
        NgbModule,
        BirthDatePipe
    ]
})
export class SharedModule { }